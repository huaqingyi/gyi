import { GyiLib, GyiStartUP } from '../../src';

export class Test extends GyiLib implements GyiStartUP {
    public async runtime(): Promise<any> {
        return await console.log('test build tools ...');
    }
}