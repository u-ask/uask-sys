import {
  IAuditDriver,
  IDocumentDriver,
  IInterviewDriver,
  IParticipantDriver,
  ISampleDriver,
  ISurveyDriver,
  ISummaryDriver,
  IUserDriver,
  IKpiDriver,
} from "../../drivers/index.js";
import { LoggingProxy } from "./logging.js";

type Ftor<T, S extends unknown[]> = (...args: S) => T;
type Ctor<T, S extends unknown[]> = { new (...args: S): T };
type Driver =
  | IParticipantDriver
  | ISurveyDriver
  | ISummaryDriver
  | ISampleDriver
  | IInterviewDriver
  | IUserDriver
  | IAuditDriver
  | IDocumentDriver
  | IKpiDriver;

function isFtor<T extends Driver, S extends unknown[]>(
  o: Ftor<T, S> | Ctor<T, S>
): o is Ftor<T, S> {
  return !o.prototype || !o.prototype.constructor.name;
}

function asFtor<T extends Driver, S extends unknown[]>(
  o: Ftor<T, S> | Ctor<T, S>
): Ftor<T, S> {
  if (isFtor(o)) return o;
  return (...a: S) => new o(...a);
}

export class Builder<T extends Driver, S extends unknown[]> {
  private constructor(private ftor: Ftor<T, S>, private args: S) {}

  with<U extends Driver, R extends unknown[]>(
    ftor: Ftor<U, [T, ...R]> | Ctor<U, [T, ...R]>,
    ...args: R
  ): Builder<U, R> {
    return new Builder(
      (...a: R) => asFtor(ftor)(this.ftor(...this.args), ...a),
      args
    );
  }

  withLogging(on = true): Builder<T, S> {
    if (on)
      return new Builder((...a: S) => LoggingProxy(this.ftor(...a)), this.args);
    return this;
  }

  private __driver: T | undefined;

  get(): T {
    if (typeof this.__driver == "undefined")
      this.__driver = this.ftor(...this.args);
    return this.__driver;
  }

  static decorate<T extends Driver, S extends unknown[]>(
    ftor: Ftor<T, S> | Ctor<T, S>,
    ...args: S
  ): Builder<T, S> {
    return new Builder(asFtor(ftor), args);
  }
}
