"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
function injectable() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (target, key) {
        var _a;
        console.log(args);
        (_a = (new core_1.TaskCore)).injectLibs.apply(_a, args);
        return target;
    };
}
exports.injectable = injectable;

//# sourceMappingURL=../sourcemaps/decorators/injectable.js.map
