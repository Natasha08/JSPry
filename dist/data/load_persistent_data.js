"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadPersistentData;
const fs_1 = __importDefault(require("fs"));
// @ts-ignore
const data_file_path_1 = __importDefault(require("./data_file_path"));
function loadPersistentData() {
    if (fs_1.default.existsSync(data_file_path_1.default)) {
        const data = fs_1.default.readFileSync(data_file_path_1.default, 'utf-8');
        return JSON.parse(data, (key, value) => {
            if (typeof value === 'string' && value.startsWith('function')) {
                return eval(`(${value})`);
            }
            return value;
        });
    }
    return {};
}
