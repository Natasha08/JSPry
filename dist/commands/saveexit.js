"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("./command"));
const save_persistent_data_1 = __importDefault(require("../data/save_persistent_data"));
class SaveExit extends command_1.default {
    constructor(repl) {
        console.log("REPL CONTEXT", repl);
        super(repl);
        this.name = 'saveexit';
        this.help = 'Save the current context and exit the REPL';
        this.action = () => {
            try {
                console.log("BEFORE PERSISITING", this.repl);
                (0, save_persistent_data_1.default)(this.repl.context);
                console.log('Session saved. Exiting...');
                this.repl.close();
            }
            catch (error) {
                console.error('Failed to save context:', error.message);
                this.repl.displayPrompt();
            }
        };
    }
}
exports.default = SaveExit;
