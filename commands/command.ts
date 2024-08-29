export interface Context { [key: string]: string; }

export interface Repl {
  close: Function;
  start: Function;
  defineCommand: Function;
  displayPrompt: Function;
  context: Context;
  eval: Function;
}

export default class Command  {
  name!: String
  help!: String
  action!: Function
  repl!: Repl

  constructor(repl: Repl) {
    this.repl = repl;
  }
}
