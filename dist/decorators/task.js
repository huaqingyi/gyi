"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const core_1 = require("../core");
const types_1 = require("../core/types");
function Task(props, key, descr) {
    if (props instanceof core_1.Core && props._root && props._root() === core_1.Core && key && descr) {
        const tasks = Reflect.getMetadata(types_1.TASKSKEY, props, types_1.TASKSKEY.toString()) || [];
        tasks.push(key);
        Reflect.defineMetadata(types_1.TASKSKEY, tasks, props, types_1.TASKSKEY.toString());
        Reflect.defineMetadata(types_1.TASKKEY, {
            target: props, method: key, action: descr.value,
            config: {},
        }, props, key);
    }
    return (target, method, dr) => {
        const tasks = Reflect.getMetadata(types_1.TASKSKEY, target, types_1.TASKSKEY.toString()) || [];
        tasks.push(method);
        Reflect.defineMetadata(types_1.TASKSKEY, tasks, target, types_1.TASKSKEY.toString());
        Reflect.defineMetadata(types_1.TASKKEY, {
            target, method, action: dr.value, config: props
        }, target, method);
    };
}
exports.Task = Task;

//# sourceMappingURL=../.sourcemaps/decorators/task.js.map
