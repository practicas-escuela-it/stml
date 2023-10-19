"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameter = void 0;
const Identifier_1 = require("./Identifier");
class Parameter {
    constructor() {
        this._identifier = new Identifier_1.Identifier("");
        this._type = new Identifier_1.Identifier("");
    }
}
exports.Parameter = Parameter;
