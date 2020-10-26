"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gyi_libs_1 = require("./gyi.libs");
const gulp_sourcemaps_1 = require("gulp-sourcemaps");
const gulp_typescript_1 = require("gulp-typescript");
const path_1 = require("path");
const merge2_1 = __importDefault(require("merge2"));
const gulp_1 = require("gulp");
class TSC extends gyi_libs_1.GyiLib {
    runtime(src, dest, tsconfig) {
        let gp = this.gulp;
        if (!this.option || !this.option.src) {
            if (!src) {
                throw new Error(`Not have source path .`);
            }
            gp = gulp_1.src(src);
        }
        const tsr = gp.pipe(gulp_sourcemaps_1.init()).pipe(gulp_typescript_1.createProject(tsconfig || path_1.join(process.cwd(), 'tsconfig.json'))());
        if (!this.option || !this.option.dest) {
            if (!dest) {
                throw new Error(`Not have dest path .`);
            }
            return merge2_1.default([
                tsr.dts.pipe(gulp_1.dest(dest)),
                tsr.js.pipe(gulp_sourcemaps_1.write('./sourcemaps')).pipe(gulp_1.dest(dest)),
            ]);
        }
        return merge2_1.default([tsr.dts, tsr.js]);
    }
}
exports.TSC = TSC;

//# sourceMappingURL=../sourcemaps/libs/tsc.js.map
