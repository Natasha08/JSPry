#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repl = require('repl');
// import loadPersistentData from './data/load_persistent_data';
// @ts-ignore
const commands_1 = __importDefault(require("./services/commands"));
const PROMPT = 'jspry> ';
class MyRepl {
    constructor() {
        this.loadContext = () => {
            this.repl.displayPrompt();
        };
        console.log("STARTING REPL...");
        this.repl = repl.start({ prompt: PROMPT, useGlobal: false });
        console.log("CREATING SERVICES...");
        this.commandService = new commands_1.default(this.repl);
        if (this.commandService.complete) {
            console.log("SERVICES READY", this.repl);
            this.loadContext();
        }
        else {
            console.log("Failed to initiate REPL...");
            console.log("Shutting Down...");
            this.repl.close();
        }
    }
}
new MyRepl();
