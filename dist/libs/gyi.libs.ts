import { TaskOption } from '../core';
import { Gulp } from './gulp';

export interface GyiStartUP {
    runtime: () => Promise<any> | WritableStream;
}

export class GyiLib {

    public static _root() {
        return GyiLib;
    }

    constructor(
        protected gulp: Gulp,
        protected option?: TaskOption,
    ) { }
}
