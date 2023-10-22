"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameter = void 0;
var Identifier_1 = require("./Identifier");
var Parameter = /** @class */ (function () {
    function Parameter() {
        this._identifier = new Identifier_1.Identifier("");
        this._type = new Identifier_1.Identifier("");
    }
    Parameter.prototype.set = function (identifier, type) {
        this._identifier = new Identifier_1.Identifier(identifier);
        this._type = new Identifier_1.Identifier(type);
    };
    return Parameter;
}());
exports.Parameter = Parameter;
