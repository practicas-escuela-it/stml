"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Model = /** @class */ (function () {
    function Model() {
        this._classes = [];
    }
    Model.prototype.getClasses = function () {
        return this._classes;
    };
    Model.prototype.addClass = function (_class) {
        this._classes.push(_class);
    };
    return Model;
}());
exports.Model = Model;
