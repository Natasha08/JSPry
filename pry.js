#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const repl = require('repl');

const helpText = require('./help/text');
const loadPersistentData = require('./data/load_persistent_data');
const savePersistentData = require('./data/save_persistent_data');
const safeAssign = require('./data/safe_assign');

// Path to the file where we'll store the variables
const dataFilePath = path.join(__dirname, 'replData.json');

// Check if the user passed the --help flag
if (process.argv.includes('--help')) {
  console.log(helpText);
  process.exit(0);
}

// Load persisted data into a global object
const persistentContext = loadPersistentData();

// Start the REPL and provide the loaded context
const myRepl = repl.start({
  prompt: 'pryjs> ',
  useGlobal: true
});

// Merge the loaded context into the REPL's context
safeAssign(myRepl.context, persistentContext);

// Custom commands
myRepl.defineCommand('exit', {
  help: 'Exit the REPL',
  action() {
    console.log('Exiting...');
    this.close();
  }
});

myRepl.defineCommand('exit --s', {
  help: 'Save the current context and exit the REPL',
  action() {
    savePersistentData(this.context);
    console.log('Session saved. Exiting...');
    this.close();
  }
});

myRepl.defineCommand('clear', {
  help: 'Clear the REPL context',
  action() {
    // Loop through all properties of the REPL context
    Object.keys(this.context).forEach((key) => {
      if (this.context.hasOwnProperty(key)) {
        delete this.context[key];
      }
    });

    console.log('Context cleared');
    this.displayPrompt();
  }
});
