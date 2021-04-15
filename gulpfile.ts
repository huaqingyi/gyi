import { join } from 'path';
import {
    GFile, Core, Task, TSC, IDoneFunction,
    write, createProject,
} from './src';
import { Test } from './test/test';

@GFile
export class GulpFile extends Core {

    @Task({ description: '测试任务 .' })
    public async test(tsc: TSC, test: Test, done: IDoneFunction) {
        // console.log(tsc, 'test ...');
        console.log('test ...');
        console.log(await test.run());
        return await done();
    }

    @Task({ series: ['test'], description: '编译任务 .' })
    public async build(tsc: TSC) {
        console.log('build ...');
        return await tsc.src([
            join(__dirname, 'src/**/*.ts'),
        ]).config({
            sourcemaps: write('./.sourcemaps'),
            typescript: createProject(join(__dirname, 'tsconfig.json')),
            declaration: true,
        }).dest(join(__dirname, 'dist')).run();
    }
}
