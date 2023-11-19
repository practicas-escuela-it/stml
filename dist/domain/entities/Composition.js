"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composition = void 0;
var Composition = /** @class */ (function () {
    function Composition() {
        this._classes = [];
    }
    Composition.prototype.addClass = function (_class) {
        this._classes.push(_class);
    };
    Composition.prototype.getClasses = function () {
        return this._classes;
    };
    return Composition;
}());
exports.Composition = Composition;
