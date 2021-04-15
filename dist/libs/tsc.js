"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.TSC = void 0;
const base_1 = require("./base");
const gulp_1 = require("gulp");
const gulp_typescript_1 = require("gulp-typescript");
const gulp_sourcemaps_1 = require("gulp-sourcemaps");
const path_1 = require("path");
class TSC extends base_1.CoreLib {
    constructor() {
        super();
        this.destOpt = path_1.join(process.cwd(), 'dist');
    }
    config(configuration) {
        this.configuration = configuration;
        return this;
    }
    src(globs, opt) {
        this.gulp = gulp_1.src(globs, opt);
        return this;
    }
    dest(folder, opt) {
        this.destOpt = folder;
        this.opt = opt;
        return this;
    }
    async run() {
        if (!this.configuration) {
            throw new Error('don\'t init configuration pleace apply .config(configuration: TSCConfiguration) .');
        }
        let { sourcemaps, typescript, declaration } = this.configuration;
        if (sourcemaps) {
            this.gulp = this.gulp.pipe(gulp_sourcemaps_1.init());
        }
        if (!typescript) {
            typescript = gulp_typescript_1.createProject(path_1.join(process.cwd(), 'tsconfig.json'));
        }
        const tsResult = this.gulp.pipe(typescript());
        if (typeof declaration === 'boolean' && declaration === true) {
            declaration = this.destOpt;
        }
        if (typeof declaration === 'string') {
            return await Promise.all([
                new Promise(r => tsResult.dts.pipe(gulp_1.dest(declaration, this.opt)).on('end', r)),
                new Promise(r => {
                    if (sourcemaps) {
                        return tsResult.js.pipe(sourcemaps).pipe(gulp_1.dest(this.destOpt, this.opt)).on('end', r);
                    }
                    return tsResult.js.pipe(gulp_1.dest(this.destOpt, this.opt)).on('end', r);
                }),
            ]);
        }
        else {
            return new Promise(r => {
                if (sourcemaps) {
                    return tsResult.js.pipe(sourcemaps).pipe(gulp_1.dest(this.destOpt, this.opt)).on('end', r);
                }
                return tsResult.js.pipe(gulp_1.dest(this.destOpt, this.opt)).on('end', r);
            });
        }
    }
}
exports.TSC = TSC;
__exportStar(require("gulp-sourcemaps"), exports);
var gulp_typescript_2 = require("gulp-typescript");
Object.defineProperty(exports, "createProject", { enumerable: true, get: function () { return gulp_typescript_2.createProject; } });

//# sourceMappingURL=../.sourcemaps/libs/tsc.js.map
