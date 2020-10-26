import { Gulp as G } from 'gulp';
import { SrcMethod, DestMethod, WatchMethod } from 'gulp';
import * as vfs from 'vinyl-fs';
import Undertaker from 'undertaker';
export declare class Gulp extends Undertaker implements G {
    static _root(): typeof Gulp;
    src: SrcMethod;
    dest: DestMethod;
    symlink: typeof vfs.symlink;
    watch: WatchMethod;
}
