import {
  IDerivedWorkflowBuilder,
  IRawWorkflowBuilder,
  IWorkflowBuilder,
} from "uask-dom";
import { FluentGenerator } from "./fluentgenerator.js";

class LazyGenerator extends FluentGenerator {
  constructor(private readonly lazy: () => void) {
    super();
  }
  build(prefix?: string, indent?: number): string {
    this.lazy();
    return super.build(prefix, indent);
  }
}

export class WorkflowGenerator
  implements IWorkflowBuilder, IRawWorkflowBuilder
{
  readonly generator = new LazyGenerator(() => this.lazy());

  private readonly _home: string[] = [];
  private readonly _seq: string[] = [];
  private readonly _n: string[] = [];
  private readonly _one: string[] = [];
  private readonly _end: string[] = [];
  private readonly _notifications: string[] = [];
  private readonly pageSetGenerator = new FluentGenerator();

  constructor() {
    this.generator.compose(this.pageSetGenerator, 0);
  }

  build(): string {
    return this.generator.build("", 0);
  }

  private lazy() {
    this.pageSetGenerator.call("home").arg(this._home[0]);
    const initial = this._seq.filter(n => !this._n.includes(n));
    if (initial.length > 0)
      this.pageSetGenerator.call("initial").args(...initial);
    const followUp = this._seq.filter(n => this._n.includes(n));
    if (followUp.length > 0)
      this.pageSetGenerator.call("followUp").args(...followUp);
    if (this._end.length > 0)
      this.pageSetGenerator.call("terminal").args(...this._end);
    const auxiliary = this._n.filter(n => !this._seq.includes(n));
    if (auxiliary.length > 0)
      this.pageSetGenerator.call("auxiliary").args(...auxiliary);
    if (this._notifications.length > 0)
      this.generator.call("notify").args(...this._notifications);
  }

  home(name: string): IWorkflowBuilder & IRawWorkflowBuilder {
    this._home.push(name);
    return this;
  }

  initial(...names: string[]): IWorkflowBuilder {
    this._seq.push(...names);
    return this;
  }

  followUp(...names: string[]): IWorkflowBuilder {
    this._seq.push(...names);
    this._n.push(...names);
    return this;
  }

  auxiliary(...names: string[]): IWorkflowBuilder {
    this._n.push(...names);
    return this;
  }

  terminal(...names: string[]): IWorkflowBuilder & IRawWorkflowBuilder {
    return this.end(...names);
  }

  end(...names: string[]): IWorkflowBuilder & IRawWorkflowBuilder {
    this._end.push(...names);
    return this;
  }

  seq(...names: string[]): IRawWorkflowBuilder {
    this._seq.push(...names);
    return this;
  }

  n(...names: string[]): IRawWorkflowBuilder {
    this._n.push(...names);
    return this;
  }

  one(...names: string[]): IRawWorkflowBuilder {
    this._one.push(...names);
    return this;
  }

  notify(...events: string[]): IWorkflowBuilder & IRawWorkflowBuilder {
    this._notifications.push(...events);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  track(): void {}
}

export class DerivedWorkflowGenerator
  implements IRawWorkflowBuilder, IDerivedWorkflowBuilder
{
  readonly generator = new LazyGenerator(() => this.lazy());

  private readonly pageSets = new Set<string>();
  private readonly notifications = new Set<string>();

  build(): string {
    return this.generator.build("", 0);
  }

  private lazy() {
    this.generator.call("withPageSets").args(...this.pageSets);
    if (this.notifications.size > 0)
      this.generator.call("notify").args(...this.notifications);
  }

  home(name: string): IRawWorkflowBuilder {
    this.pageSets.add(name);
    return this;
  }

  end(...names: string[]): IRawWorkflowBuilder {
    for (const name of names) this.pageSets.add(name);
    return this;
  }

  seq(...names: string[]): IRawWorkflowBuilder {
    for (const name of names) this.pageSets.add(name);
    return this;
  }

  n(...names: string[]): IRawWorkflowBuilder {
    for (const name of names) this.pageSets.add(name);
    return this;
  }

  one(...names: string[]): IRawWorkflowBuilder {
    for (const name of names) this.pageSets.add(name);
    return this;
  }

  withPageSets(...types: string[]): IDerivedWorkflowBuilder {
    for (const name of types) this.pageSets.add(name);
    return this;
  }

  notify(...events: string[]): IRawWorkflowBuilder & IDerivedWorkflowBuilder {
    for (const ev of events) this.notifications.add(ev);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  track(): void {}
}
