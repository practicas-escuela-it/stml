"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composition = void 0;
var Identifier_1 = require("./Identifier");
var Composition = /** @class */ (function () {
    function Composition() {
        this._identifiers = [];
    }
    Composition.prototype.addIdentifier = function (name) {
        this._identifiers.push(new Identifier_1.Identifier(name));
    };
    return Composition;
}());
exports.Composition = Composition;
