import gulp, { Gulp } from 'gulp';
import { SrcOptions, DestOptions } from 'vinyl-fs';

export interface CoreLibTask {
    src(globs: string | string[], opt?: SrcOptions): this;
    pipe<T extends WritableStream>(destination: T, options?: { end?: boolean; }): this;
    dest(folder: string, opt?: DestOptions): this;
    run: () => Promise<any>;
}

export class CoreLib implements CoreLibTask {
    public static _root() {
        return CoreLib;
    }

    protected gulp: Gulp | any;

    constructor() {
        this.gulp = gulp;
    }

    public src(globs: string | string[], opt?: SrcOptions): this {
        throw new Error('pleace rewirte to CoreLibTask -> src method .');
    }

    public pipe<T extends WritableStream>(destination: T, options?: { end?: boolean; }): this {
        if (this.gulp.pipe) {
            this.gulp = this.gulp.pipe(destination, options);
            return this;
        }
        throw new Error('don\'t init src path .');
    }

    public dest(folder: string | ((file: File) => string), opt?: DestOptions): this {
        throw new Error('pleace rewirte to CoreLibTask -> dest method .');
    }

    public run(): Promise<any> {
        throw new Error('pleace rewirte to CoreLibTask -> run method .');
    }
}
