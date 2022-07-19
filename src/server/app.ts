import restana, { Protocol, Service } from "restana";
import { graphqlHTTP } from "express-graphql";
import helmet from "helmet";
import { exportRouter } from "./rest/exportserver.js";
import { buildSchema } from "./graphql/index.js";
import { IncomingMessage } from "http";
import { oidcService, oidcClose } from "./oidc.js";
import bodyParser from "body-parser";
import { adminRouter } from "./admin/index.js";
import { Consumer, DriverFactory } from "./factory.js";
import { TokenVerifier } from "./tokenVerifier.js";
import { GraphQLError } from "graphql";
import serveStatic from "serve-static";
import { errorMessage } from "../system/server.js";
import { htmlRouter } from "./rest/htmlserver.js";
import { documentRouter } from "./rest/documentserver.js";
import { notificationRouter } from "./rest/notificationserver.js";
import { INotifier } from "../system/notifier.js";
import { Notifier } from "./utils/notifier.js";
import debug from "debug";
const dlog = debug("uask:http");

export function app(
  service: Service<Protocol.HTTP | Protocol.HTTPS>,
  driverFactory: DriverFactory
): Service<Protocol.HTTP | Protocol.HTTPS> {
  service = service.use((req, res, next) => {
    res.on("finish", () => {
      dlog(
        req.socket.remoteAddress,
        req.method,
        req.originalUrl,
        res.statusCode
      );
    });

    next();
  });
  service = setCors(service);
  service = setFacade(service);
  service = setTokenVerifier(service);
  service = service
    .use(bodyParser.json({ limit: "10mb" }))
    .use(bodyParser.raw({ limit: "10mb" }));
  service = setRest(service, driverFactory);
  service = setGraphql(service, driverFactory);
  return service;
}

export function appClose(): Promise<void> {
  return oidcClose();
}

function setCors<P extends Protocol>(service: restana.Service<P>) {
  return service
    .use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    })
    .options("*", (req, res) => {
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, PATCH, PUT, POST, DELETE, OPTIONS"
      );
      res.send();
    });
}

function setFacade(
  service: restana.Service<restana.Protocol.HTTP | restana.Protocol.HTTPS>
) {
  return service
    .use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            "form-action": [
              "'self'",
              new URL(process.env.CALLBACK_ROOT_URL as string).host,
            ],
          },
        },
        crossOriginResourcePolicy: { policy: "cross-origin" },
      })
    )
    .use(
      serveStatic(
        process.env.AUTH_APP_PATH ?? "node_modules/uask-auth/dist/app"
      )
    )
    .use("/oidc", oidcService);
}

function setTokenVerifier(
  service: restana.Service<restana.Protocol.HTTP | restana.Protocol.HTTPS>
) {
  const verifier = new TokenVerifier();
  return service
    .use((req, res, next) => verifier.verify(req, res, next))
    .use("/shorttoken/processed", (req, res) => verifier.processed(req, res))
    .use("/shorttoken/generate", (req, res) => verifier.generate(req, res));
}

function setRest(
  service: restana.Service<restana.Protocol.HTTP | restana.Protocol.HTTPS>,
  driverFactory: DriverFactory
) {
  const notifier: Consumer<INotifier> = async (d, u) =>
    new Notifier(d.userDriver, u);
  return service
    .use("/notification", notificationRouter(driverFactory, notifier))
    .use("/document", documentRouter(driverFactory))
    .use("/export", exportRouter(driverFactory))
    .use("/print", htmlRouter(driverFactory))
    .use("/admin", adminRouter(driverFactory));
}

function setGraphql(
  service: restana.Service<restana.Protocol.HTTP | restana.Protocol.HTTPS>,
  driverFactory: DriverFactory
) {
  const schema = buildSchema(driverFactory);
  service = service.use("/graphql", (req, res) => {
    const graphqlService = graphqlHTTP({
      schema,
      customFormatErrorFn,
      context: { req, res },
    });
    const request = req as IncomingMessage & { url: string };
    graphqlService(request, res);
  });
  return service;
}

function customFormatErrorFn(error: GraphQLError) {
  return errorMessage(
    error.message,
    error.originalError?.name != "UaskError" ? 500 : undefined
  );
}
