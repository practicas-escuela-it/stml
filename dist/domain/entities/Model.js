"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Class_1 = require("./Class");
var Model = /** @class */ (function () {
    function Model() {
        this._classes = [];
    }
    Model.prototype.getClasses = function () {
        return this._classes;
    };
    Model.prototype.hasClasses = function () {
        return this._classes.length > 0;
    };
    Model.prototype.getClass = function (className) {
        var _classReturn = new Class_1.Class("");
        this._classes.forEach(function (_class) {
            if (_class.name == className) {
                _classReturn = _class;
            }
        });
        return _classReturn;
    };
    Model.prototype.addClass = function (_class) {
        this._classes.push(_class);
    };
    Model.prototype.removeClass = function (_class) {
        var _this = this;
        var _index = 0;
        this._classes.forEach(function (__class) {
            if (__class.name.indexOf(_class.name) >= 0) {
                _this._classes.splice(_index, 1);
                return;
            }
            _index++;
        });
    };
    Model.prototype.exists = function (className) {
        var result = false;
        this._classes.forEach(function (_class) {
            if (_class.name.trim().indexOf(className.trim()) >= 0) {
                result = true;
            }
        });
        return result;
    };
    Model.prototype.copy = function (model) {
        var _this = this;
        model.getClasses().forEach(function (_classToCopy) {
            var _class = new Class_1.Class(_classToCopy.name);
            _class.copy(_classToCopy);
            _this._classes.push(_class);
        });
    };
    return Model;
}());
exports.Model = Model;
