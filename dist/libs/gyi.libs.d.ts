import { TaskOption } from '../core';
import { Gulp } from './gulp';
export interface GyiStartUP {
    runtime: () => Promise<any> | WritableStream;
}
export declare class GyiLib {
    protected gulp: Gulp;
    protected option?: TaskOption | undefined;
    static _root(): typeof GyiLib;
    constructor(gulp: Gulp, option?: TaskOption | undefined);
}
