/// <reference types="node" />
import { GyiLib } from './gyi.libs';
import { Configuration } from 'webpack';
export declare class Webpack extends GyiLib {
    /**
     * build config import
     * @param config configpath or webpack.Configuration
     */
    runtime(config?: string | Configuration): Promise<NodeJS.ReadWriteStream>;
}
