import { isFunction } from 'lodash';
import { Gyi, TaskOption } from '../core';

export type GyiDecorator = <G extends Gyi>(proto: G, key: string) => void;

export function Task(option: TaskOption): GyiDecorator;
export function Task<G extends Gyi>(target: G, key: string): void;
export function Task(target: any, key?: string) {
    if (target._root && isFunction(target._root) && target._root() === Gyi && key) {
        if (!target.$tasks) { target.$tasks = []; }
        target.$tasks.push({ action: target[key], name: key });
        return target;
    }
    return function (proto: any, key: string) {
        if (!proto.$tasks) { proto.$tasks = []; }
        proto.$tasks.push({ action: proto[key], name: key, option: target });
        return proto;
    }
}