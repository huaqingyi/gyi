"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gyi_libs_1 = require("./gyi.libs");
const webpack_1 = __importDefault(require("webpack"));
const lodash_1 = require("lodash");
class Webpack extends gyi_libs_1.GyiLib {
    /**
     * build config import
     * @param config configpath or webpack.Configuration
     */
    async runtime(config) {
        let configuration = {};
        if (config) {
            if (lodash_1.isString(config)) {
                configuration = Object.create(require(config));
            }
            else {
                configuration = config;
            }
        }
        try {
            if (!configuration) {
                configuration = Object.create(require(lodash_1.join(process.cwd(), 'webpack.config')));
            }
            return await new Promise(r => webpack_1.default(configuration, async (err, stats) => {
                if (err)
                    return await Promise.reject(err);
                return await stats;
            }));
        }
        catch (err) {
            return await Promise.reject(err);
        }
    }
}
exports.Webpack = Webpack;

//# sourceMappingURL=../sourcemaps/libs/webpack.js.map
