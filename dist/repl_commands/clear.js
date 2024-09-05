"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("./command"));
class Clear extends command_1.default {
    constructor(repl) {
        super(repl);
        this.name = 'beer';
        this.help = 'Clear the REPL context';
        this.action = () => {
            // Loop through all properties of the REPL context
            Object.keys(this.repl.context).forEach((key) => {
                if (this.repl.context.hasOwnProperty(key)) {
                    delete this.repl.context[key];
                }
            });
            console.log('Context cleared');
            this.repl.displayPrompt();
        };
    }
}
exports.default = Clear;
