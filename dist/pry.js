#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repl = require('repl');
const commands_1 = __importDefault(require("./services/commands"));
const PROMPT = 'jspry> ';
const myRepl = repl.start({ prompt: PROMPT, useGlobal: false });
const commandService = new commands_1.default(myRepl);
if (commandService.complete) {
    console.log("SERVICES READY... LOADING PROMPT....");
    myRepl.displayPrompt();
}
else {
    console.log("Failed to initiate REPL...");
    console.log("Shutting Down...");
    myRepl.close();
}
exports.default = myRepl;
