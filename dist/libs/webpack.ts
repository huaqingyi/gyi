import { GyiLib } from './gyi.libs';
import webpack, { Configuration } from 'webpack';
import { isString, join } from 'lodash';

export class Webpack extends GyiLib {
    /**
     * build config import
     * @param config configpath or webpack.Configuration
     */
    async runtime(
        config?: string | Configuration
    ): Promise<NodeJS.ReadWriteStream> {
        let configuration: Configuration = {};
        if (config) {
            if (isString(config)) {
                configuration = Object.create(require(config));
            } else {
                configuration = config;
            }
        }
        try {
            if (!configuration) {
                configuration = Object.create(require(join(process.cwd(), 'webpack.config')));
            }
            return await new Promise(r => webpack(configuration, async (err, stats) => {
                if (err) return await Promise.reject(err);
                return await stats;
            }));
        } catch (err) {
            return await Promise.reject(err);
        }
    }
}