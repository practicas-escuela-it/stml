"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
const Identifier_1 = require("./Identifier");
class Method {
    constructor() {
        this._identifier = new Identifier_1.Identifier("");
        this._parameters = [];
    }
}
exports.Method = Method;
