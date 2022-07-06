import got from "got";
import { Client } from "uask-auth/client";
import { IDrivers } from "../drivers/index.js";
import { ClientDrivers } from "./driver.js";

export class UaskClient implements IDrivers {
  private readonly auth: Client;
  private readonly drivers: Promise<ClientDrivers>;

  constructor(private readonly url: string) {
    this.auth = new Client(`${url}/oidc`);
    this.drivers = this.auth.getTokens().then(toks => {
      const cli = got.extend({
        prefixUrl: url,
        headers: {
          Authorization: `Bearer ${toks.access_token}`,
        },
      });
      return new ClientDrivers(cli);
    });
  }

  surveyDriver = this.deref("surveyDriver", "getByName", "save");

  sampleDriver = this.deref(
    "sampleDriver",
    "getAll",
    "getBySampleCode",
    "save"
  );

  participantDriver = this.deref(
    "participantDriver",
    "getAll",
    "getBySample",
    "getByParticipantCode",
    "save",
    "delete"
  );

  interviewDriver = this.deref("interviewDriver", "save", "delete");

  summaryDriver = this.deref("summaryDriver", "getParticipantSummaries");

  userDriver = this.deref("userDriver", "getAll", "getByUserId", "save");

  auditDriver = this.deref("auditDriver", "get");

  documentDriver = this.deref(
    "documentDriver",
    "getAll",
    "getByHash",
    "getContent",
    "save",
    "saveContent",
    "delete"
  );

  kpiDriver = this.deref("kpiDriver", "getAll");

  destroy() {
    return this.auth.destroy();
  }

  private deref<T extends keyof IDrivers>(
    driver: T,
    ...methods: (keyof IDrivers[T])[]
  ) {
    return methods.reduce((d, m) => {
      const impl = (...args: unknown[]) =>
        this.drivers.then(d =>
          Reflect.get(d[driver], m).call(d[driver], ...args)
        );
      return Object.assign(d, { [m]: impl });
    }, {} as IDrivers[T]);
  }
}
