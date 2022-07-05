export class FluentGenerator {
  private readonly code: (string | ((prefix: string | number) => string))[][] =
    [];
  private current: (string | ((prefix: string | number) => string))[] = [];
  private argCount = 0;
  private optionalArgs: undefined[] = [];

  get isEmpty(): boolean {
    return this.code.length == 0 && this.current.length == 0;
  }

  cancel(): void {
    if (this.current.length > 0) this.current = [];
    else if (this.code.length > 0) this.code.pop();
    this.argCount = 0;
  }

  compose(
    gen: FluentGenerator,
    prefix: string | number = 1,
    indent = typeof prefix == "string" ? 1 : prefix + 1
  ): this {
    this.initCall();
    this.code.push([() => gen.build(prefix, indent)]);
    return this;
  }

  call(name: string): this {
    this.initCall();
    this.current.push(name, "(");
    return this;
  }

  prop(name: string): this {
    this.initCall();
    this.current.push(name);
    return this;
  }

  arg(arg: unknown): this {
    if (this.argCount > 0) this.current.push(", ");
    this.argCount++;
    this.pushArg(arg);
    return this;
  }

  private pushArg(arg: unknown) {
    if (typeof arg == "string") this.current.push(`"${arg}"`);
    else if (typeof arg == "function")
      this.current.push(arg as (p: string | number) => string);
    else if (Array.isArray(arg)) {
      this.current.push("[");
      arg.forEach((a, i) => {
        if (i > 0) this.current.push(", ");
        this.pushArg(a);
      });
      this.current.push("]");
    } else if (typeof arg == "object") this.current.push(JSON.stringify(arg));
    else this.current.push(String(arg));
  }

  args(...args: unknown[]): this {
    for (const arg of args) this.arg(arg);
    return this;
  }

  opt(arg: unknown): this {
    if (typeof arg == "undefined") this.optionalArgs.push(arg);
    else {
      this.args(...this.optionalArgs, arg);
      this.optionalArgs = [];
    }
    return this;
  }

  opts(...args: unknown[]): this {
    for (const arg of args) this.opt(arg);
    return this;
  }

  build(prefix: string | number = "", indent = 1): string {
    this.initCall();
    if (this.code.length == 0) return "";
    return `${
      typeof prefix == "string" ? prefix : "  ".repeat(prefix)
    }${this.code
      .map(c => this.buildInstruction(c, prefix))
      .filter(i => i != "")
      .join("\n" + "  ".repeat(indent))}`;
  }

  private buildInstruction(
    instr: (string | ((prefix: string | number) => string))[],
    prefix: string | number
  ): string {
    return instr.map(tok => this.getToken(tok, prefix)).join("");
  }

  private getToken(
    tok: string | ((prefix: string | number) => string),
    prefix: string | number
  ): string {
    return typeof tok == "string" ? tok : tok(prefix);
  }

  private initCall() {
    if (this.current.length > 0) {
      if (this.current.length == 1) this.code.push([".", this.current[0]]);
      else this.code.push([".", ...this.current, ")"]);
      this.current = [];
      this.optionalArgs = [];
      this.argCount = 0;
    }
  }
}
