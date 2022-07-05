import { Issuer, Client } from "openid-client";
import { createRemoteJWKSet, jwtVerify, JWTVerifyGetKey } from "jose";
import { Protocol, Request, Response } from "restana";
import { Stealer } from "stealer";
import crypto from "crypto";
import debug from "debug";
const dlog = debug("uask:auth");

const jwks_uri = `${process.env.AUTH_URL}/jwks`;

type Token = { value: string; type: "jwt" | "opaque" };

export class TokenVerifier {
  readonly JWKS = TokenVerifier.createRemoteJWKSet();
  private oidc?: Client;

  static createRemoteJWKSet(): JWTVerifyGetKey {
    return createRemoteJWKSet(new URL(jwks_uri));
  }

  readonly tokens = new Stealer<number, Token>({ ttl: 60, unref: true });
  readonly processedTokens = new Stealer<number, boolean>({
    ttl: 180,
    unref: true,
  });

  generate<P extends Protocol>(req: Request<P>, res: Response<P>): void {
    const shortToken = crypto.randomInt(Math.pow(2, 47));
    const token = getToken(req);
    this.tokens.set(shortToken, token);
    res.send({ shortToken }, 200, {
      "Content-Type": "text/json",
    });
  }

  async verify<P extends Protocol>(
    req: Request<P>,
    res: Response<P>,
    next: (error?: unknown) => void
  ): Promise<void> {
    const shortToken = Number(req.query.shortToken);
    const { token, fromShortToken } = this.getRealToken<P>(
      req,
      res,
      shortToken
    );
    if (fromShortToken) {
      this.handleTokenLifeCycle<P>(res, shortToken);
    }
    await this.verifyToken<P>(req, res, token)
      .then(userinfo => {
        this.setUserInfo(res, userinfo);
        next();
      })
      .catch(e => {
        res.send(e, 400);
      });
  }

  private getRealToken<P extends Protocol>(
    req: Request<P>,
    res: Response<P>,
    shortToken: number
  ) {
    const fromShortToken = this.fromShortToken(shortToken);
    const token = fromShortToken ?? getToken(req);
    return { token, fromShortToken };
  }

  private verifyToken<P extends Protocol>(
    req: Request<P>,
    res: Response<P>,
    token: Token
  ) {
    return token.type == "jwt"
      ? this.verifyJWT(req, res, token.value)
      : this.verifyOpaque(req, res, token.value);
  }

  private setUserInfo<P extends Protocol>(res: Response<P>, userinfo: unknown) {
    const { locals } = res as Response<P> & {
      locals: Record<string, unknown>;
    };
    Object.assign(res, { ...locals, locals: { userinfo } });
  }

  private handleTokenLifeCycle<P extends Protocol>(
    res: Response<P>,
    shortToken: number
  ) {
    this.tokens.delete(shortToken);
    if (res.statusCode == 200) {
      this.setProcessed<P>(res, shortToken);
    }
  }

  private setProcessed<P extends Protocol>(
    res: Response<P>,
    shortToken: number
  ) {
    this.processedTokens.set(shortToken, false);
    const listener = this.getTokenListener<P>(res, shortToken);
    res.on("close", listener);
  }

  private getTokenListener<P extends Protocol>(
    res: Response<P>,
    shortToken: number
  ) {
    const setProcessed = () => {
      this.processedTokens.set(shortToken, true);
      res.removeListener("close", setProcessed);
    };
    return setProcessed;
  }

  async processed<P extends Protocol>(
    req: Request<P>,
    res: Response<P>
  ): Promise<void> {
    this.retryProcessed<P>(req, res);
  }

  private retryProcessed<P extends Protocol>(
    req: Request<P>,
    res: Response<P>,
    retryCount = 0
  ) {
    const shortToken = Number(req.query.shortToken);
    const processed = this.isProcessedToken(shortToken);
    if (processed || retryCount == 20) {
      res.send({ processed }, 200, {
        Content_Type: "application/json",
      });
    } else
      setTimeout(() => {
        this.retryProcessed(req, res, retryCount + 1);
      }, 3000);
  }

  verifyJWT<P extends Protocol>(
    req: Request<P>,
    res: Response<P>,
    token: string
  ): Promise<unknown> {
    return jwtVerify(token, this.JWKS).then(({ payload }) => payload);
  }

  async verifyOpaque<P extends Protocol>(
    req: Request<P>,
    res: Response<P>,
    token: string
  ): Promise<unknown> {
    if (typeof this.oidc == "undefined") {
      this.oidc = await getOidc();
    }
    return this.oidc.userinfo(token);
  }

  private fromShortToken(shortToken: number): Token | undefined {
    if (!shortToken) return undefined;
    return this.tokens.get(shortToken);
  }

  private isProcessedToken(shortToken: number): boolean {
    if (!shortToken) return false;
    return this.processedTokens.get(shortToken) ?? true;
  }
}

function getOidc(retries = 5): Promise<Client> {
  dlog(`discovering ${process.env.AUTH_URL}, retries : ${retries}`);
  return Issuer.discover(process.env.AUTH_URL as string)
    .then(
      iss =>
        new iss.Client({
          client_id: "nextmove",
          response_types: ["code"],
          token_endpoint_auth_method: "none",
        })
    )
    .catch(r => (retries > 0 ? getOidc(retries - 1) : Promise.reject(r)));
}

export function getToken<P extends Protocol>(req: Request<P>): Token {
  const value = (req.headers["authorization"] as string)?.substring(7);
  const type = /^[\w-]*\.[\w-]*\.[\w-]*$/.test(value) ? "jwt" : "opaque";
  return { value, type };
}
