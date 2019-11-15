## 自动注入 Gulp 工具
```
import { GFile, Task, TSC, Gulp } from 'gyi';
import { join } from 'path';

// 自定义扩展包
import { Test } from './custom/build/test';

@GFile
export class GulpFile {

    // 创建 build 任务
    @Task({
        src: join(__dirname, 'src/**/*.ts'),
        dest: join(__dirname, 'dist')
    })
    public async build(tsc: TSC) {
        // 使用 gyi typescript build 扩展
        console.log('build');
        tsc.runtime();
    }

    // wacth 热更新进程
    @Task()
    public async default(gulp: Gulp) {
        console.log('build');
        gulp.watch(join(__dirname, 'src/**/*.ts'), gulp.series('build'));
    }

}
```