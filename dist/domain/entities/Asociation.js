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
    Association.prototype.isEqualTo = function (association) {
        var _equals = true;
        var _classNames = this.getClassNames();
        association.classes.forEach(function (_class) {
            if (_classNames.get(_class.name) == null) {
                _equals = false;
            }
        });
        return _equals;
    };
    Association.prototype.getClassNames = function () {
        var _classNames = new Map();
        this._classes.forEach(function (_class) {
            _classNames.set(_class.name, _class);
        });
        return _classNames;
    };
    return Association;
}());
exports.Association = Association;
