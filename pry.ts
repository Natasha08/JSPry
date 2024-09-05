#!/usr/bin/env node

const repl = require('repl');
// import loadPersistentData from './data/load_persistent_data';
// @ts-ignore
import CommandsService from './services/commands';
import {Repl} from './repl_commands/command';
import {Context} from './repl_commands/command';

const PROMPT = 'jspry> ';

class MyRepl {
  repl: Repl
  commandService: CommandsService;

  constructor() {
    console.log("STARTING REPL...");
    this.repl = repl.start({prompt: PROMPT, useGlobal: false});

    console.log("CREATING SERVICES...");
    this.commandService = new CommandsService(this.repl);

    if (this.commandService.complete) {
      console.log("SERVICES READY", this.repl);

      this.loadContext();
    } else {
      console.log("Failed to initiate REPL...");
      console.log("Shutting Down...");
      this.repl.close();
    }
  }

  loadContext = () => {
    this.repl.displayPrompt();
  }
}

new MyRepl();
