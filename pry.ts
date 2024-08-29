#!/usr/bin/env node

const repl = require('repl');
import CommandsService from './services/commands';

const PROMPT = 'jspry> ';

const myRepl = repl.start({prompt: PROMPT, useGlobal: false});

const commandService = new CommandsService(myRepl);

if (commandService.complete) {
  console.log("SERVICES READY... LOADING PROMPT....");

} else {
  console.log("Failed to initiate REPL...");
  console.log("Shutting Down...");

  myRepl.close();
}

export default myRepl;
