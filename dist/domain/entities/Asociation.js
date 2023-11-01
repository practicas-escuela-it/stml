"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Association = void 0;
var Identifier_1 = require("./Identifier");
var Association = /** @class */ (function () {
    function Association() {
        this._identifiers = [];
    }
    Object.defineProperty(Association.prototype, "identifiers", {
        get: function () {
            return this._identifiers;
        },
        enumerable: false,
        configurable: true
    });
    Association.prototype.addIdentifier = function (identifier) {
        this._identifiers.push(new Identifier_1.Identifier(identifier));
    };
    return Association;
}());
exports.Association = Association;
