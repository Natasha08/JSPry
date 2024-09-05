import helpText from '../help/text';
import Command, {Repl} from './command';

export default class Help extends Command  {
  name = "help"
  help = "options menu"
  action = () => {
    if (process.argv.includes('--help')) {
      console.log(helpText);
      this.repl.close();
    }
  }

  constructor(repl: Repl) {
    super(repl);

    this.action();
  }
}
