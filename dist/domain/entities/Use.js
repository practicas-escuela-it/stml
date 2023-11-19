"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Use = void 0;
var Use = /** @class */ (function () {
    function Use() {
        this._classes = [];
    }
    Object.defineProperty(Use.prototype, "classes", {
        get: function () {
            return this._classes;
        },
        enumerable: false,
        configurable: true
    });
    Use.prototype.addClass = function (_class) {
        this._classes.push(_class);
    };
    return Use;
}());
exports.Use = Use;
