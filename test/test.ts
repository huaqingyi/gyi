import { CoreLib } from '../src';

export class Test extends CoreLib {
    public async run() {
        console.log('测试扩展 ...');
        return true;
    }
}
