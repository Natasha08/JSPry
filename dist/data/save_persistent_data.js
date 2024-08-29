"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// @ts-ignore
const data_file_path_js_1 = __importDefault(require("./data_file_path.js"));
const savePersistentData = (context) => {
    console.log("IM FAILING BEFORE", context);
    const cache = new Set();
    const data = JSON.stringify(context, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                return; // Circular reference found, discard key
            }
            cache.add(value);
        }
        return value;
    }, 2);
    fs_1.default.writeFileSync(data_file_path_js_1.default, data);
    cache.clear();
};
exports.default = savePersistentData;
