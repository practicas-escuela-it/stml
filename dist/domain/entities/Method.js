"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
var Identifier_1 = require("./Identifier");
var Parameter_1 = require("./Parameter");
var Method = /** @class */ (function () {
    function Method() {
        this._identifier = new Identifier_1.Identifier("");
        this._parameters = [];
    }
    Method.prototype.setIdentifier = function (identifier) {
        this._identifier = new Identifier_1.Identifier(identifier);
    };
    Method.prototype.addParameter = function (identifier, type) {
        var parameter = new Parameter_1.Parameter();
        parameter.set(identifier, type);
        this._parameters.push(parameter);
    };
    return Method;
}());
exports.Method = Method;
