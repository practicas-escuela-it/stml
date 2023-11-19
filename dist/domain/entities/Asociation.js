"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Association = void 0;
var Association = /** @class */ (function () {
    function Association() {
        this._classes = [];
    }
    Object.defineProperty(Association.prototype, "classes", {
        get: function () {
            return this._classes;
        },
        enumerable: false,
        configurable: true
    });
    Association.prototype.addClass = function (_class) {
        this._classes.push(_class);
    };
    return Association;
}());
exports.Association = Association;
