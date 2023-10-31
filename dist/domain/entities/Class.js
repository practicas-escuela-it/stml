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
        this._associations = [];
    }
    Object.defineProperty(Class.prototype, "getIdentifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "getAttributes", {
        /* get getInherits(): Identifier[] {
             return this._inherists;
         } */
        get: function () {
            return this._attributes;
        },
        enumerable: false,
        configurable: true
    });
    Class.prototype.addAttribute = function (attribute) {
        this._attributes.push(attribute);
    };
    /*  addInherit(identifer: Identifier) {
         this._inherists.push(identifer);
      }   */
    Class.prototype.addInherit = function (_class) {
        this._inherists.push(_class);
    };
    Class.prototype.addMethod = function (method) {
        this._methods.push(method);
    };
    Class.prototype.addComposition = function (composition) {
        this._compositions.push(composition);
    };
    Class.prototype.addUse = function (use) {
        this._uses.push(use);
    };
    Class.prototype.addAsociation = function (association) {
        this._associations.push(association);
    };
    return Class;
}());
exports.Class = Class;
