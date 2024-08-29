#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const repl = require('repl');

// Path to the file where we'll store the variables
const dataFilePath = path.join(__dirname, 'replData.json');

// Define help information
const helpText = `
pryjs - Interactive JavaScript REPL

Usage:
  pryjs [options]

Options:
  --help              Show help information
  .exit               Exit the REPL
  .exit --s           Save the current context and exit the REPL
  .clear              Clear the REPL context

Commands:
  .exit               Exit the REPL
  .clear              Clear the REPL context and all variables

Examples:
  pryjs               Start the REPL
  pryjs --help        Show this help message
`;


// Check if the user passed the --help flag
if (process.argv.includes('--help')) {
  console.log(helpText);
  process.exit(0);
}

// Function to load the persisted data
function loadPersistentData() {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data, (key, value) => {
      if (typeof value === 'string' && value.startsWith('function')) {
        return eval(`(${value})`);
      }
      return value;
    });
  }
  return {};
}

// Function to save the current context to the file
function savePersistentData(context) {
  const cache = new Set();
  const data = JSON.stringify(context, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return; // Circular reference found, discard key
      }
      cache.add(value);
    }
    return value;
  }, 2);
  fs.writeFileSync(dataFilePath, data);
  cache.clear();
}

// Load persisted data into a global object
const persistentContext = loadPersistentData();

// Start the REPL and provide the loaded context
const myRepl = repl.start({
  prompt: 'pryjs> ',
  useGlobal: true
});

function safeAssign(target, source) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      try {
        target[key] = source[key];
      } catch (error) {
        console.warn(`Skipping ${key}:`, error.message);
      }
    }
  }
}

// Merge the loaded context into the REPL's context
safeAssign(myRepl.context, persistentContext);

// Save the context when the REPL exits
myRepl.on('exit', () => {
  savePersistentData(myRepl.context);
  console.log('REPL session saved.');
  process.exit();
});

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
