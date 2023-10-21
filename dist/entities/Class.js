"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
var Identifier_1 = require("./Identifier");
var Class = /** @class */ (function () {
    function Class(name) {
        this._identifier = new Identifier_1.Identifier(name);
        this._inherists = [];
        this._attributes = [];
        this._methods = [];
        this._compositions = [];
        this._uses = [];
        this._asociations = [];
    }
    Object.defineProperty(Class.prototype, "getIdentifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "getInherits", {
        get: function () {
            return this._inherists;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "getAttributes", {
        get: function () {
            return this._attributes;
        },
        enumerable: false,
        configurable: true
    });
    Class.prototype.addAttribute = function (attribute) {
        this._attributes.push(attribute);
    };
    Class.prototype.addIdentifierInherit = function (identifer) {
        this._inherists.push(identifer);
    };
    return Class;
}());
exports.Class = Class;
