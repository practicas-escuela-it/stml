"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassBuilder = void 0;
var Class_1 = require("./Class");
var Diagram_1 = require("./Diagram");
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
        var _diagram = new Diagram_1.Diagram();
        var classes = [];
        this._classes.forEach(function (_class) {
            _diagram.addClass(_class);
        });
        return _diagram;
    };
    return ClassBuilder;
}());
exports.ClassBuilder = ClassBuilder;
