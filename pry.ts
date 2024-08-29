#!/usr/bin/env node

const repl = require('repl');

const loadPersistentData = require('./data/load_persistent_data');
const savePersistentData = require('./data/save_persistent_data');
const safeAssign = require('./data/safe_assign');
const CommandsService = require('./services/commands');

const PROMPT = 'jspry> ';

class MyRepl {
  repl: Repl
  commandService: Object

  constructor() {
    this.repl = repl.start({
      prompt: PROMPT,
      useGlobal: true
    });

    console.log("CREATING SERVICES...");
    this.commandService = new CommandsService(this.repl).create();
  }
}

const myRepl = new MyRepl();
// Load persisted data into a global object
const persistentContext = loadPersistentData();

// Start the REPL and provide the loaded context
// const myRepl = repl.start({
//   prompt: 'jspry> ',
//   useGlobal: true
// });

// Merge the loaded context into the REPL's context
// safeAssign(myRepl.context, persistentContext);

// Custom commands
// myRepl.defineCommand('exit', {
//   help: 'Exit the REPL',
//   action() {
//     console.log('Exiting...');
//     this.close();
//   }
// });

// myRepl.defineCommand('saveexit', {
//   help: 'Save the current context and exit the REPL',
//   action() {
//     savePersistentData(this.context);
//     console.log('Session saved. Exiting...');
//     this.close();
//   }
// });

// myRepl.defineCommand('clear', {
//   help: 'Clear the REPL context',
//   action() {
//     // Loop through all properties of the REPL context
//     Object.keys(this.context).forEach((key) => {
//       if (this.context.hasOwnProperty(key)) {
//         delete this.context[key];
//       }
//     });

//     console.log('Context cleared');
//     this.displayPrompt();
//   }
// });
