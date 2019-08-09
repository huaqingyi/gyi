import { GFile, Task, TSC } from './src';
import { join } from 'path';

@GFile
export class GulpFile {

    @Task()
    public async test(){
        return await console.log('test');
    }

    @Task({
        src: join(__dirname, 'src/**/*.ts'),
        series:['test']
    })
    public async build(tsc: TSC) {
        console.log('build');
        // watch.run(
        //     path.join(__dirname, 'src/**/*.ts'),
        //     (gulp: Gulp) => {
        //         console.log('watch ...')
        //         let tsResult = gulp
        //             .src([path.join(__dirname, 'src/**/*.ts')])
        //             .pipe(sourcemaps.init())
        //             .pipe(ts.createProject('tsconfig.json')());
        //         return merge([
        //             tsResult.dts.pipe(gulp.dest('./dist')),
        //             tsResult.js.pipe(sourcemaps.write("./sourcemaps"))
        //                 .pipe(gulp.dest('./dist'))
        //         ]);
        //     }
        // )
    }

}