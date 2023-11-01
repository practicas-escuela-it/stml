"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Use = void 0;
var Identifier_1 = require("./Identifier");
var Use = /** @class */ (function () {
    function Use() {
        this._identifiers = [];
    }
    Object.defineProperty(Use.prototype, "identifiers", {
        get: function () {
            return this._identifiers;
        },
        enumerable: false,
        configurable: true
    });
    Use.prototype.addIdentifier = function (identifier) {
        this._identifiers.push(new Identifier_1.Identifier(identifier));
    };
    return Use;
}());
exports.Use = Use;
