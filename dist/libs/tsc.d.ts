/// <reference types="node" />
import { CoreLib } from './base';
import { SrcOptions, DestOptions } from 'vinyl-fs';
import { Project } from 'gulp-typescript';
export interface TSCConfiguration {
    sourcemaps?: NodeJS.ReadWriteStream;
    typescript?: Project;
    declaration?: string | boolean;
}
export declare class TSC extends CoreLib {
    destOpt: any;
    opt?: DestOptions;
    configuration?: TSCConfiguration;
    constructor();
    config(configuration: TSCConfiguration): this;
    src(globs: string | string[], opt?: SrcOptions): this;
    dest(folder: string | ((file: File) => string), opt?: DestOptions): this;
    run(): Promise<unknown>;
}
export * from 'gulp-sourcemaps';
export { Project, createProject } from 'gulp-typescript';
