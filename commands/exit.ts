import Command, {Repl} from './command';

export default class Exit extends Command  {
  name = 'exit'
  help = 'Exit the REPL'

  action = () => {
    console.log('Exiting...');
    this.repl.close();
  }

  constructor(repl: Repl) {
    super(repl);
  }
}
