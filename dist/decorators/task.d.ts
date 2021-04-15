import { Core, ITask } from '../core';
export declare function Task(options: ITask): (target: Core, key: string, descr: TypedPropertyDescriptor<any>) => any;
export declare function Task(target: Core, key: string, descr: TypedPropertyDescriptor<any>): any;
