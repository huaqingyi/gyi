import Undertaker from 'undertaker';
export interface GyiStruct {
}
export declare type StringStruct = string | Function | Array<string | Function>;
export declare type QueueStruct = Undertaker.TaskFunction | Array<Undertaker.TaskFunction>;
export interface TaskOption {
    src?: StringStruct | Promise<StringStruct>;
    dest?: string | Function | Promise<string | Function>;
    series?: QueueStruct | Promise<QueueStruct>;
    parallel?: QueueStruct | Promise<QueueStruct>;
    name?: string;
    displayName?: string;
    description?: string | Promise<string> | Function;
    flags?: object;
}
export declare class Gyi implements GyiStruct {
    _root(): typeof Gyi;
    $tasks: Array<{
        option?: TaskOption;
        action: Function;
        name: string;
    }>;
    constructor();
}
export declare type GyiBootstrap<G> = {
    new (...args: any[]): G & Gyi;
} & typeof Gyi;
