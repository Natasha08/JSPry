"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = __importDefault(require("../help/text"));
const command_1 = __importDefault(require("./command"));
class Help extends command_1.default {
    constructor(repl) {
        super(repl);
        this.name = "help";
        this.help = "options menu";
        this.action = () => {
            if (process.argv.includes('--help')) {
                console.log(text_1.default);
                this.repl.close();
            }
        };
        this.action();
    }
}
exports.default = Help;
