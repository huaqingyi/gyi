import { GFile, Task, Gulp, TSC, Gyi } from './src';
import { join } from 'path';
import { Test } from './custom/build/test';

@GFile
export class GulpFile extends Gyi {

    @Task({
        src: join(__dirname, 'src/**/*.ts'),
        dest: join(__dirname, 'dist'),
        description: `测试 build ...`,
    })
    public async build(tsc: TSC) {
        console.log('build');
        tsc.runtime();
    }

    @Task
    public async test(test: Test) {
        console.log(await test.runtime());
    }

    @Task
    public async default(gulp: Gulp) {
        console.log(gulp);
    }
}
