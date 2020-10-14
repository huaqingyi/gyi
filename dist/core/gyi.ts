import gulp, { dest, parallel, series, src, task } from 'gulp';
import { isArray, isFunction, map } from 'lodash';
import Undertaker from 'undertaker';
import { Gulp } from '../libs';
import { GyiLib } from '../libs/gyi.libs';

export interface GyiStruct {

}

export type StringStruct = string | Function | Array<string | Function>;
export type QueueStruct = Undertaker.TaskFunction | Array<Undertaker.TaskFunction>;

export interface TaskOption {
    // The gulp src reg
    src?: StringStruct | Promise<StringStruct>;
    // The gulp on output dirname
    dest?: string | Function | Promise<string | Function>;
    // Series tasks
    series?: QueueStruct | Promise<QueueStruct>;
    // Parallel tasks
    parallel?: QueueStruct | Promise<QueueStruct>;
    // A special property of named functions. Used to register the task. 
    // Note: name is not writable; it cannot be set or changed.
    name?: string;
    // When attached to a taskFunction creates an alias for the task. 
    // If using characters that aren't allowed in function names, use this property.
    displayName?: string;
    // When attached to a taskFunction provides a description to be printed by the command line when listing tasks.
    description?: string | Promise<string> | Function;
    // When attached to a taskFunction provides flags to be printed by the command line when listing tasks. 
    // The keys of the object represent the flags and the values are their descriptions.
    flags?: object;
}

export class Gyi implements GyiStruct {

    public _root() {
        return Gyi;
    }

    public $tasks!: Array<{ option?: TaskOption; action: Function; name: string; }>;

    constructor() {
        map(this.$tasks, async tkconf => {

            let action: any = async (done: Function) => {

                let gp: any = gulp;
                if (tkconf.option) {
                    if (tkconf.option.src) {
                        let sc: any = await tkconf.option.src;
                        if (isArray(sc)) { sc = await Promise.all(map(sc, async (s: any) => await s())); }
                        if (isFunction(sc)) { sc = await sc(); }
                        gp = src(sc);
                    }
                }

                const props = Reflect.getMetadata('design:paramtypes', this, tkconf.name);
                const args = map(props, prop => {
                    if (prop._root && isFunction(prop._root) && prop._root() === Gulp) {
                        return gp;
                    }

                    if (prop._root && isFunction(prop._root) && prop._root() === GyiLib) {
                        return new prop(gp, tkconf.option);
                    }
                });

                await tkconf.action.apply(this, args);

                if (tkconf.option) {
                    if (tkconf.option.dest) {
                        let dt: any = await tkconf.option.dest;
                        if (isFunction(dt)) { dt = await dt(); }
                        const compile = gp.pipe(dest(dt));
                        await new Promise(r => compile.on('end', r));
                    }
                }
                return done();
            }

            if (tkconf.option) {
                const tasks: any[] = [];
                if (tkconf.option.series) {
                    let series = await tkconf.option.series;
                    if (!isArray(series)) { series = [series]; }
                    tasks.push(...series);
                    tasks.push(action);
                } else {
                    tasks.push(action);
                }

                action = series(...tasks);

                if (tkconf.option.parallel) {
                    let parallel = await tkconf.option.parallel;
                    if (!isArray(parallel)) { parallel = [parallel]; }
                    tasks.push(...parallel);
                    tasks.push(action);
                }

                action = parallel(...tasks);

                if (tkconf.option.name) { action.name = tkconf.name; }
                if (tkconf.option.displayName) { action.displayName = tkconf.option.displayName; }
                if (tkconf.option.description) { action.description = tkconf.option.description; }
                if (tkconf.option.flags) { action.flags = tkconf.option.flags; }
            }

            task(tkconf.name, action);
        });
    }
}

export type GyiBootstrap<G> = {
    new(...args: any[]): G & Gyi;
} & typeof Gyi;
