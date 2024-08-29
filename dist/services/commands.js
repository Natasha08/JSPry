"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = __importDefault(require("../commands"));
class CommandsService {
    constructor(repl) {
        this.complete = false;
        this.create = () => {
            commands_1.default.forEach((ReplCommand) => {
                const command = new ReplCommand(this.repl);
                this.repl.eval = function (cmd, context, filename, callback) {
                    console.log('REPL Context:', context);
                    callback(null, eval(cmd));
                };
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
