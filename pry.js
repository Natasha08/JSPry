#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const repl = require('repl');

// Path to the file where we'll store the variables
const dataFilePath = path.join(__dirname, 'replData.json');

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

myRepl.defineCommand('clear', {
  help: 'Clear the REPL context',
  action() {
    this.clearBufferedCommand();
    console.log('Context cleared');
    this.displayPrompt();
  }
});
