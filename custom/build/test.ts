import { GyiLib } from '../../src';

export class Test extends GyiLib {
    async runtime(): Promise<any> {
        return await console.log('test build tools ...');
    }
}