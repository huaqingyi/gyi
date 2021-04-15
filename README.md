# npm i gyi --save-dev

## 自动注入 Gulp 工具

```typescript
import { join } from 'path';
import {
    GFile, Core, Task, TSC, IDoneFunction,
    write, createProject,
} from 'gyi';
import { Test } from './test/test';

@GFile
export class GulpFile extends Core {

    @Task
    public async default() {
        console.log('default');
        return 'default';
    }

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
```

## 自定义包规范

```typescript
import { CoreLib } from 'gyi';

export class Test extends CoreLib {
    public async run() {
        console.log('测试扩展 ...');
        return true;
    }
}
```
