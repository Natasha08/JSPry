"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = safeAssign;
function safeAssign(target, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            try {
                target[key] = source[key];
            }
            catch (error) {
                console.warn(`Skipping ${key}:`, error.message);
            }
        }
    }
}
