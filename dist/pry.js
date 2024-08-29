#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repl = require('repl');
const load_persistent_data_1 = __importDefault(require("./data/load_persistent_data"));
// @ts-ignore
const safe_assign_1 = __importDefault(require("./data/safe_assign"));
const commands_1 = __importDefault(require("./services/commands"));
const PROMPT = 'jspry> ';
const myRepl = repl.start({ prompt: PROMPT, useGlobal: false });
const commandService = new commands_1.default(myRepl);
function loadContext() {
    (0, safe_assign_1.default)(myRepl.context, (0, load_persistent_data_1.default)());
    myRepl.displayPrompt();
}
if (commandService.complete) {
    console.log("SERVICES READY");
    loadContext();
}
else {
    console.log("Failed to initiate REPL...");
    console.log("Shutting Down...");
    myRepl.close();
}
