import runner from "tape";
import sinon from "sinon";
import { importJWK, SignJWT } from "jose";
import { Issuer, Client } from "openid-client";
import { TokenVerifier } from "./tokenVerifier.js";

const keys = JSON.parse(process.env.AUTH_JWKS ?? "");

const key = importJWK(keys.keys[3], "HS256");
const sandbox = sinon.createSandbox();
sandbox.stub(TokenVerifier, "createRemoteJWKSet").callsFake(() => () => key);
runner.onFinish(() => sandbox.restore());

sandbox.stub(Issuer, "discover").callsFake(() =>
  Promise.resolve({
    Client: class {
      userinfo() {
        return payload;
      }
    },
  } as unknown as Issuer<Client>)
);

export const payload = {
  userid: "test@arone.com",
  surveys: { SandBox: { samples: ["garden"], role: "masterofworld" } },
};

export async function generateToken(): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({
      alg: "RS256",
    })
    .setExpirationTime("60s")
    .sign(await key);
}
