"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
var Identifier_1 = require("./Identifier");
var Method = /** @class */ (function () {
    function Method() {
        this._identifier = new Identifier_1.Identifier("");
        this._parameters = [];
    }
    return Method;
}());
exports.Method = Method;
