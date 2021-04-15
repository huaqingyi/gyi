import { CoreLib } from './base';
import { SrcOptions, DestOptions } from 'vinyl-fs';
import { src, dest } from 'gulp';
import { Project, createProject } from 'gulp-typescript';
import { init } from 'gulp-sourcemaps';
import { join } from 'path';

export interface TSCConfiguration {
    sourcemaps?: NodeJS.ReadWriteStream;
    typescript?: Project;
    declaration?: string | boolean;
}

export class TSC extends CoreLib {

    public destOpt: any;
    public opt?: DestOptions;
    public configuration?: TSCConfiguration;

    constructor() {
        super();
        this.destOpt = join(process.cwd(), 'dist');
    }

    public config(configuration: TSCConfiguration) {
        this.configuration = configuration;
        return this;
    }

    public src(globs: string | string[], opt?: SrcOptions) {
        this.gulp = src(globs, opt);
        return this;
    }

    public dest(folder: string | ((file: File) => string), opt?: DestOptions) {
        this.destOpt = folder;
        this.opt = opt;
        return this;
    }

    public async run() {
        if (!this.configuration) { throw new Error('don\'t init configuration pleace apply .config(configuration: TSCConfiguration) .'); }
        let { sourcemaps, typescript, declaration } = this.configuration;
        if (sourcemaps) { this.gulp = this.gulp.pipe(init()); }
        if (!typescript) { typescript = createProject(join(process.cwd(), 'tsconfig.json')); }
        const tsResult = this.gulp.pipe(typescript());
        if (typeof declaration === 'boolean' && declaration === true) { declaration = this.destOpt; }
        if (typeof declaration === 'string') {
            return await Promise.all([
                new Promise(r => tsResult.dts.pipe(dest(declaration as string, this.opt)).on('end', r)),
                new Promise(r => {
                    if (sourcemaps) { return tsResult.js.pipe(sourcemaps).pipe(dest(this.destOpt, this.opt)).on('end', r); }
                    return tsResult.js.pipe(dest(this.destOpt, this.opt)).on('end', r);
                }),
            ]);
        } else {
            return new Promise(r => {
                if (sourcemaps) { return tsResult.js.pipe(sourcemaps).pipe(dest(this.destOpt, this.opt)).on('end', r); }
                return tsResult.js.pipe(dest(this.destOpt, this.opt)).on('end', r);
            });
        }
    }
}

export * from 'gulp-sourcemaps';
export { Project, createProject } from 'gulp-typescript';
