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
    Use.prototype.isEqualTo = function (useToRemove) {
        var _equals = true;
        var _classNames = this.getClassNames();
        useToRemove.classes.forEach(function (_class) {
            if (_classNames.get(_class.name) == null) {
                _equals = false;
            }
        });
        return _equals;
    };
    Use.prototype.getClassNames = function () {
        var _classNames = new Map();
        this._classes.forEach(function (_class) {
            _classNames.set(_class.name, _class);
        });
        return _classNames;
    };
    return Use;
}());
exports.Use = Use;
