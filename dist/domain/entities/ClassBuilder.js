"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassBuilder = void 0;
var Class_1 = require("./Class");
var ClassBuilder = /** @class */ (function () {
    function ClassBuilder() {
        this._classes = new Map();
    }
    ClassBuilder.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ClassBuilder();
        }
        return this._instance;
    };
    ClassBuilder.prototype.getClass = function (identifier) {
        if (this._classes.get(identifier) == null) {
            this._classes.set(identifier, new Class_1.Class(identifier));
        }
        return this._classes.get(identifier);
    };
    ClassBuilder.prototype.getAllClasses = function () {
        var _classes = [];
        this._classes.forEach(function (_class) {
            _classes.push(_class);
        });
        return _classes;
    };
    return ClassBuilder;
}());
exports.ClassBuilder = ClassBuilder;
