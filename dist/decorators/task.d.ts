import { Gyi, TaskOption } from '../core';
export declare type GyiDecorator = <G extends Gyi>(proto: G, key: string) => void;
export declare function Task(option: TaskOption): GyiDecorator;
export declare function Task<G extends Gyi>(target: G, key: string): void;
