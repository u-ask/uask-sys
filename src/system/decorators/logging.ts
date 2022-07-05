import {
  IAuditDriver,
  IDocumentDriver,
  IInterviewDriver,
  IParticipantDriver,
  ISampleDriver,
  IKpiDriver,
  ISurveyDriver,
  ISummaryDriver,
  IUserDriver,
} from "../../drivers/index.js";

import debug from "debug";
const dlog = debug("uask:drivers");

export function LoggingProxy<
  T extends
    | IParticipantDriver
    | ISurveyDriver
    | ISummaryDriver
    | ISampleDriver
    | IInterviewDriver
    | IUserDriver
    | IAuditDriver
    | IDocumentDriver
    | IKpiDriver
>(target: T): T {
  if (isNode && !dlog.enabled) return target;
  const name = Object.getPrototypeOf(target).constructor.name;
  return new Proxy<T>(target, {
    get: (t, p, r) => {
      const q = Reflect.get(t, p, r);
      if (!p.toString().startsWith("get") && !p.toString().startsWith("save"))
        return q;
      return async (...args: unknown[]) => {
        const namespace = `${name}.${String(p)}`;
        dlog(namespace, "start");
        const result = await q.call(t, ...args);
        dlog(namespace, "end");
        return result;
      };
    },
  });
}

const isNode = typeof process?.hrtime == "function";
