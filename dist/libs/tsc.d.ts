import { GyiLib } from './gyi.libs';
import { Settings } from 'gulp-typescript';
import merge from 'merge2';
export declare class TSC extends GyiLib {
    runtime(src?: string, dest?: string, tsconfig?: string | Settings): merge.Merge2Stream;
}
