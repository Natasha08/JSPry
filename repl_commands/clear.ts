import Command, {Repl} from './command';

export default class Clear extends Command  {
  name = 'beer'
  help = 'Clear the REPL context'

  action = () => {
    // Loop through all properties of the REPL context
    Object.keys(this.repl.context).forEach((key) => {
      if (this.repl.context.hasOwnProperty(key)) {
        delete this.repl.context[key];
      }
    });

    console.log('Context cleared');
    this.repl.displayPrompt();
  }

  constructor(repl: Repl) {
    super(repl);
  }
}
