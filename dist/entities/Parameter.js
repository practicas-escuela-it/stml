"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameter = void 0;
var Identifier_1 = require("./Identifier");
var Parameter = /** @class */ (function () {
    function Parameter() {
        this._identifier = new Identifier_1.Identifier("");
        this._type = new Identifier_1.Identifier("");
    }
    return Parameter;
}());
exports.Parameter = Parameter;
