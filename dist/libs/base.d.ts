import { Gulp } from 'gulp';
import { SrcOptions, DestOptions } from 'vinyl-fs';
export interface CoreLibTask {
    src(globs: string | string[], opt?: SrcOptions): this;
    pipe<T extends WritableStream>(destination: T, options?: {
        end?: boolean;
    }): this;
    dest(folder: string, opt?: DestOptions): this;
    run: () => Promise<any>;
}
export declare class CoreLib implements CoreLibTask {
    static _root(): typeof CoreLib;
    protected gulp: Gulp | any;
    constructor();
    src(globs: string | string[], opt?: SrcOptions): this;
    pipe<T extends WritableStream>(destination: T, options?: {
        end?: boolean;
    }): this;
    dest(folder: string | ((file: File) => string), opt?: DestOptions): this;
    run(): Promise<any>;
}
