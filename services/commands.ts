import Commands from '../commands';
import Command, {Repl, Context} from '../commands/command';

export default class CommandsService {
  repl: Repl
  complete: Boolean = false

  constructor(repl: Repl) {
    this.repl = repl;

    this.create();
  }

  create = () => {
    Commands.forEach((ReplCommand: typeof Command) => {
      const command = new ReplCommand(this.repl);

      this.repl.eval = function(cmd: string, context: Context, filename: string, callback: Function) {
        console.log('REPL Context:', context);
        callback(null, eval(cmd));
      };

      this.repl.defineCommand(command.name, {
        help: command.help,
        action: command.action.bind(this)
      });
    });

    this.complete = true;
  }
}
