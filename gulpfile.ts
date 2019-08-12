import { GFile, Task, TSC } from './src';
import { join } from 'path';
import { Test } from './custom/build/test';

@GFile
export class GulpFile {

    @Task()
    public async test() {
        console.log('test');
    }

    @Task({
        src: join(__dirname, 'src/**/*.ts'),
        dest: join(__dirname, 'dist'),
        series: ['test'],
        injectable: { Test }
    })
    public async build(tsc: TSC, test: Test) {
        await test.runtime();
        console.log('build');
        await tsc.runtime();
    }

}