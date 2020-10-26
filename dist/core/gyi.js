"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importStar(require("gulp"));
const lodash_1 = require("lodash");
const libs_1 = require("../libs");
const gyi_libs_1 = require("../libs/gyi.libs");
class Gyi {
    _root() {
        return Gyi;
    }
    constructor() {
        lodash_1.map(this.$tasks, async (tkconf) => {
            let action = async (done) => {
                let gp = gulp_1.default;
                if (tkconf.option) {
                    if (tkconf.option.src) {
                        let sc = await tkconf.option.src;
                        if (lodash_1.isArray(sc)) {
                            sc = await Promise.all(lodash_1.map(sc, async (s) => await s()));
                        }
                        if (lodash_1.isFunction(sc)) {
                            sc = await sc();
                        }
                        gp = gulp_1.src(sc);
                    }
                }
                const props = Reflect.getMetadata('design:paramtypes', this, tkconf.name);
                const args = lodash_1.map(props, prop => {
                    if (prop._root && lodash_1.isFunction(prop._root) && prop._root() === libs_1.Gulp) {
                        return gp;
                    }
                    if (prop._root && lodash_1.isFunction(prop._root) && prop._root() === gyi_libs_1.GyiLib) {
                        return new prop(gp, tkconf.option);
                    }
                });
                await tkconf.action.apply(this, args);
                if (tkconf.option) {
                    if (tkconf.option.dest) {
                        let dt = await tkconf.option.dest;
                        if (lodash_1.isFunction(dt)) {
                            dt = await dt();
                        }
                        const compile = gp.pipe(gulp_1.dest(dt));
                        await new Promise(r => compile.on('end', r));
                    }
                }
                return done();
            };
            if (tkconf.option) {
                const tasks = [];
                if (tkconf.option.series) {
                    let series = await tkconf.option.series;
                    if (!lodash_1.isArray(series)) {
                        series = [series];
                    }
                    tasks.push(...series);
                    tasks.push(action);
                }
                else {
                    tasks.push(action);
                }
                action = gulp_1.series(...tasks);
                if (tkconf.option.parallel) {
                    let parallel = await tkconf.option.parallel;
                    if (!lodash_1.isArray(parallel)) {
                        parallel = [parallel];
                    }
                    tasks.push(...parallel);
                    tasks.push(action);
                }
                action = gulp_1.parallel(...tasks);
                if (tkconf.option.name) {
                    action.name = tkconf.name;
                }
                if (tkconf.option.displayName) {
                    action.displayName = tkconf.option.displayName;
                }
                if (tkconf.option.description) {
                    action.description = tkconf.option.description;
                }
                if (tkconf.option.flags) {
                    action.flags = tkconf.option.flags;
                }
            }
            gulp_1.task(tkconf.name, action);
        });
    }
}
exports.Gyi = Gyi;

//# sourceMappingURL=../sourcemaps/core/gyi.js.map
