"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const core_1 = require("../core");
function Task(target, key) {
    if (target._root && lodash_1.isFunction(target._root) && target._root() === core_1.Gyi && key) {
        if (!target.$tasks) {
            target.$tasks = [];
        }
        target.$tasks.push({ action: target[key], name: key });
        return target;
    }
    return function (proto, key) {
        if (!proto.$tasks) {
            proto.$tasks = [];
        }
        proto.$tasks.push({ action: proto[key], name: key, option: target });
        return proto;
    };
}
exports.Task = Task;

//# sourceMappingURL=../sourcemaps/decorators/task.js.map
