import Undertaker from 'undertaker';
import { Core, ITask, ITaskOptions } from '../core';
import { TASKKEY, TASKSKEY } from '../core/types';

export function Task(options: ITask): (target: Core, key: string, descr: TypedPropertyDescriptor<any>) => any;
export function Task(target: Core, key: string, descr: TypedPropertyDescriptor<any>): any;
export function Task(props: ITask | Core, key?: string, descr?: TypedPropertyDescriptor<any>) {
    if (props instanceof Core && props._root && props._root() === Core && key && descr) {
        const tasks: string[] = Reflect.getMetadata(TASKSKEY, props, TASKSKEY.toString()) || [];
        tasks.push(key);
        Reflect.defineMetadata(TASKSKEY, tasks, props, TASKSKEY.toString());

        Reflect.defineMetadata(TASKKEY, {
            target: props, method: key, action: descr.value,
            config: {},
        } as ITaskOptions, props, key);
    }
    return (target: Core, method: string, dr: TypedPropertyDescriptor<any>) => {
        const tasks: string[] = Reflect.getMetadata(TASKSKEY, target, TASKSKEY.toString()) || [];
        tasks.push(method);
        Reflect.defineMetadata(TASKSKEY, tasks, target, TASKSKEY.toString());

        Reflect.defineMetadata(TASKKEY, { 
            target, method, action: dr.value, config: props 
        } as ITaskOptions, target, method);
    }
}