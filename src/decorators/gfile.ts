import { GulpFile, Core, TASKKEY, ITaskOptions, IDoneFunction, TASKSKEY } from '../core';
import { map } from 'lodash';
import { task, series as ss, parallel as pl, TaskFunction } from 'gulp';
import { CoreLib } from '../libs';

export function GFile<G extends GulpFile<Core>>(target: G) {
    const tasks: string[] = Reflect.getMetadata(TASKSKEY, target.prototype, TASKSKEY.toString());

    map(tasks, (method) => {
        const data: ITaskOptions = Reflect.getMetadata(TASKKEY, target.prototype, method); // 获取存的路径
        const { parallel, series, description, displayName } = data.config;
        const paramtypes = Reflect.getMetadata('design:paramtypes', target.prototype, method);
        const actions: TaskFunction[] = [async done => {
            const params = map(paramtypes, pt => {
                if (pt._root && pt._root() === IDoneFunction) { return done; }
                if (pt._root && pt._root() === CoreLib) { return new pt(); }
                return pt;
            });
            const result = await target.prototype[method].apply(target.prototype, params);
            await done();
            return result;
        }];
        if (series && parallel) actions.unshift(ss(...series, pl(...parallel)));
        else if (series && !parallel) actions.unshift(ss(...series));
        else if (!series && parallel) actions.unshift(pl(...parallel));
        const exec = ss(actions);
        exec.displayName = displayName || method;
        exec.description = description;
        task(data.method, exec);
    });
}
