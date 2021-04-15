"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreLib = void 0;
const gulp_1 = __importDefault(require("gulp"));
class CoreLib {
    constructor() {
        this.gulp = gulp_1.default;
    }
    static _root() {
        return CoreLib;
    }
    src(globs, opt) {
        throw new Error('pleace rewirte to CoreLibTask -> src method .');
    }
    pipe(destination, options) {
        if (this.gulp.pipe) {
            this.gulp = this.gulp.pipe(destination, options);
            return this;
        }
        throw new Error('don\'t init src path .');
    }
    dest(folder, opt) {
        throw new Error('pleace rewirte to CoreLibTask -> dest method .');
    }
    run() {
        throw new Error('pleace rewirte to CoreLibTask -> run method .');
    }
}
exports.CoreLib = CoreLib;

//# sourceMappingURL=../.sourcemaps/libs/base.js.map
