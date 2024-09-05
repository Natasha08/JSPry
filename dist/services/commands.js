"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repl_commands_1 = __importDefault(require("../repl_commands"));
class CommandsService {
    constructor(repl) {
        this.complete = false;
        this.create = () => {
            repl_commands_1.default.forEach((ReplCommand) => {
                const command = new ReplCommand(this.repl);
                this.repl.defineCommand(command.name, {
                    help: command.help,
                    action: command.action.bind(this)
                });
            });
            this.complete = true;
        };
        this.repl = repl;
        this.create();
    }
}
exports.default = CommandsService;
