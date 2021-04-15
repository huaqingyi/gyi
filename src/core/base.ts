import Undertaker from 'undertaker';

export class Core {
    public _root() {
        return Core;
    }
}

export declare interface GulpFile<C extends Core> {
    new(...args: any[]): C;
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

export class IDoneFunction extends Function {
    public static _root() {
        return IDoneFunction;
    }
}
