"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GFile = void 0;
const core_1 = require("../core");
const lodash_1 = require("lodash");
const gulp_1 = require("gulp");
const libs_1 = require("../libs");
function GFile(target) {
    const tasks = Reflect.getMetadata(core_1.TASKSKEY, target.prototype, core_1.TASKSKEY.toString());
    lodash_1.map(tasks, (method) => {
        const data = Reflect.getMetadata(core_1.TASKKEY, target.prototype, method); // 获取存的路径
        const { parallel, series, description, displayName } = data.config;
        const paramtypes = Reflect.getMetadata('design:paramtypes', target.prototype, method);
        const actions = [async (done) => {
                const params = lodash_1.map(paramtypes, pt => {
                    if (pt._root && pt._root() === core_1.IDoneFunction) {
                        return done;
                    }
                    if (pt._root && pt._root() === libs_1.CoreLib) {
                        return new pt();
                    }
                    return pt;
                });
                const result = await target.prototype[method].apply(target.prototype, params);
                await done();
                return result;
            }];
        if (series && parallel)
            actions.unshift(gulp_1.series(...series, gulp_1.parallel(...parallel)));
        else if (series && !parallel)
            actions.unshift(gulp_1.series(...series));
        else if (!series && parallel)
            actions.unshift(gulp_1.parallel(...parallel));
        const exec = gulp_1.series(actions);
        exec.displayName = displayName || method;
        exec.description = description;
        gulp_1.task(data.method, exec);
    });
}
exports.GFile = GFile;

//# sourceMappingURL=../.sourcemaps/decorators/gfile.js.map
