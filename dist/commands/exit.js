"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("./command"));
class Exit extends command_1.default {
    constructor(repl) {
        super(repl);
        this.name = 'exit';
        this.help = 'Exit the REPL';
        this.action = () => {
            console.log('Exiting...');
            this.repl.close();
        };
    }
}
exports.default = Exit;
