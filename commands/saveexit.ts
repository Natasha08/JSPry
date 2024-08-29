import Command, {Repl} from './command';
import savePersistentData from '../data/save_persistent_data';

export default class SaveExit extends Command  {
  name = 'saveexit'
  help = 'Save the current context and exit the REPL'

  action = () => {
    try {
      console.log("BEFORE PERSISITING", this.repl)
      savePersistentData(this.repl.context);
      console.log('Session saved. Exiting...');
      this.repl.close();
    } catch (error: any) {
      console.error('Failed to save context:', error.message);
      this.repl.displayPrompt();
    }
  }

  constructor(repl: Repl) {
    console.log("REPL CONTEXT", repl)
    super(repl);
  }
}
