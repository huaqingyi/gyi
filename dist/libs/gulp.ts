import { Gulp as G } from 'gulp';
import { SrcMethod, DestMethod, WatchMethod } from 'gulp';
import * as vfs from 'vinyl-fs';
import Undertaker from 'undertaker';

export class Gulp extends Undertaker implements G {
    public static _root() {
        return Gulp;
    }

    src!: SrcMethod;
    dest!: DestMethod;
    symlink!: typeof vfs.symlink;
    watch!: WatchMethod;
}