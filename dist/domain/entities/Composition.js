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
    Composition.prototype.isEqualTo = function (composition) {
        var _equals = true;
        var _classNames = this.getClassNames();
        composition.getClasses().forEach(function (_class) {
            if (_classNames.get(_class.name) == null) {
                _equals = false;
            }
        });
        return _equals;
    };
    Composition.prototype.removeClasses = function () {
        this._classes.splice(0, this._classes.length);
        this._classes = [];
    };
    Composition.prototype.getClassNames = function () {
        var _classNames = new Map();
        this._classes.forEach(function (_class) {
            _classNames.set(_class.name, _class);
        });
        return _classNames;
    };
    return Composition;
}());
exports.Composition = Composition;
