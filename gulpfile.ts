/*
 * @FilePath: /gyi/gulpfile.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-10-14 10:57:28
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-10-26 14:42:39
 * @debugger: 
 */
import { GFile, Task, Gulp, TSC, Gyi } from './dist';
import { join } from 'path';
import { Test } from './custom/build/test';

@GFile
export class GulpFile extends Gyi {

    @Task({ description: `测试 build ...`, })
    public async build(tsc: TSC) {
        console.log('build');
        tsc.runtime(
            join(__dirname, 'src/**/*.ts'),
            join(__dirname, 'dist')
        );
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
