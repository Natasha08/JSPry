import Commands from '../repl_commands';
import Command, {Repl} from '../repl_commands/command';

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

      this.repl.defineCommand(command.name, {
        help: command.help,
        action: command.action.bind(this)
      });
    });

    this.complete = true;
  }
}
