## npm i gyi --save-dev
## 自动注入 Gulp 工具
```
import { GFile, Task, Gulp, TSC, Gyi } from 'gyi';
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
```

#### 自定义包规范
```
import { GyiLib, GyiStartUP } from 'gyi';

export class Test extends GyiLib implements GyiStartUP {
    public async runtime(): Promise<any> {
        return await console.log('test build tools ...');
    }
}
```