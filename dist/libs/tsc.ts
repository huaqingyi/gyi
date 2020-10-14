import { GyiLib } from './gyi.libs';
import { init, write } from 'gulp-sourcemaps';
import { createProject, Settings } from 'gulp-typescript';
import { join } from 'path';
import merge from 'merge2';
import { src as source, dest as destf } from 'gulp';

export class TSC extends GyiLib {

    public runtime(
        src?: string, dest?: string,
        tsconfig?: string | Settings
    ) {
        let gp: NodeJS.ReadWriteStream = this.gulp as any;
        if (!this.option || !this.option.src) {
            if (!src) { throw new Error(`Not have source path .`); }
            gp = source(src);
        }
        const tsr = gp.pipe(init()).pipe(
            createProject(
                tsconfig || join(process.cwd(), 'tsconfig.json') as any
            )()
        );

        if (!this.option || !this.option.dest) {
            if (!dest) { throw new Error(`Not have dest path .`); }
            return merge([
                tsr.dts.pipe(destf(dest)),
                tsr.js.pipe(write('./sourcemaps')).pipe(destf(dest)),
            ]);
        }
        return merge([tsr.dts, tsr.js]);
    }
}
