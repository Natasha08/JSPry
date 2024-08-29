#!/usr/bin/env node

const repl = require('repl');
import loadPersistentData from './data/load_persistent_data';
// @ts-ignore
import safeAssign from './data/safe_assign';
import CommandsService from './services/commands';

const PROMPT = 'jspry> ';

const myRepl = repl.start({prompt: PROMPT, useGlobal: false});
const commandService = new CommandsService(myRepl);

function loadContext() {
  safeAssign(myRepl.context, loadPersistentData());
  myRepl.displayPrompt();
}

if (commandService.complete) {
  console.log("SERVICES READY");

  loadContext();
} else {
  console.log("Failed to initiate REPL...");
  console.log("Shutting Down...");

  myRepl.close();
}
