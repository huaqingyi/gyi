import { GYI } from "./gyi";
import Undertaker from 'undertaker';
import { map, filter, difference } from 'lodash';
import gulp from 'gulp';

export interface TaskOption {
    src?: string;
    dest?: string;
    series?: Undertaker.Task[];
    parallel?: Undertaker.Task[];
}

export interface TaskConfig {
    option?: TaskOption;
    inject?: string[];
}

export class TaskCore extends GYI {

    async injectTask(name: string, key: string, option: TaskConfig) {
        if (!this.store[name]) this.store[name] = [];
        this.store[name].push({ key, option });
    }

    async makeTask(mode: Function) {
        const { name } = mode;
        const instance = new (mode as any);

        const delayTasks = filter(this.store[name], config => {
            if (!config.option) return false;
            const { option } = config.option;
            if (!option) return false;
            if (option.series || option.parallel) return true;
            return false;
        });

        const tasks = difference(this.store[name], delayTasks);

        await Promise.all(map(tasks, async config => {
            const { key, option } = config;
            if (option.inject) {

            }
            let exec = (async (done: any) => {
                let end: NodeJS.ReadWriteStream;
                let destEnd: NodeJS.ReadWriteStream | null = null;
                if (option.option) {
                    const { src, dest } = option.option;
                    if (src) end = await gulp.src(src);
                    if (dest) destEnd = gulp.dest(dest);
                }
                end = await instance[key].apply(instance);
                if (end && destEnd !== null) end = await end.pipe(destEnd);
                return await done(end) || end;
            }).bind(this);

            await gulp.task(key, exec);
        }));

        return await Promise.all(map(delayTasks, async config => {
            const { key, option } = config;
            if (option.inject) {

            }
            if (option.option) {
                const { src, dest, series, parallel } = option.option;
                let exec = (async (done: any) => {
                    let end: NodeJS.ReadWriteStream;
                    if (src) end = await gulp.src(src);
                    end = await instance[key].apply(instance);
                    if (end && dest) end = await end.pipe(gulp.dest(dest));
                    return await done(end) || end;
                }).bind(this);

                if (series) {
                    await gulp.task(key, gulp.series(series.concat([exec])));
                } else if (parallel) {
                    await gulp.task(key, gulp.parallel(parallel.concat([exec])));
                }
            }
            return await gulp;
        }));
    }
}