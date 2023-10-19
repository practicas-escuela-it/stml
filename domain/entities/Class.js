"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const Identifier_1 = require("./Identifier");
class Class {
    constructor(name) {
        this._identifier = new Identifier_1.Identifier(name);
        this._inherists = [];
        this._attributes = [];
        this._methods = [];
        this._compositions = [];
        this._uses = [];
        this._asociations = [];
    }
    get getIdentifier() {
        return this._identifier;
    }
    get getInherits() {
        return this._inherists;
    }
    get getAttributes() {
        return this._attributes;
    }
}
exports.Class = Class;
