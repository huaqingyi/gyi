import Undertaker from 'undertaker';
export declare class Core {
    _root(): typeof Core;
}
export declare interface GulpFile<C extends Core> {
    new (...args: any[]): C;
}
export interface ITask {
    series?: Undertaker.Task[];
    parallel?: Undertaker.Task[];
    displayName?: string;
    description?: string;
}
export interface ITaskOptions {
    target: Core;
    method: string;
    action: Function;
    config: ITask;
}
export declare class IDoneFunction extends Function {
    static _root(): typeof IDoneFunction;
}
