"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Class_1 = require("./Class");
var Model = /** @class */ (function () {
    function Model() {
        this._classes = [];
        this._map = new Map();
    }
    Model.prototype.getClasses = function () {
        var __classes = [];
        if (this._map.size > 0) {
            for (var _i = 0, _a = this._map.values(); _i < _a.length; _i++) {
                var value = _a[_i];
                __classes.push(value);
                // console.log("VALUE: " + entry[1]);
            }
        }
        // return __classes; */
        return this._classes;
    };
    Model.prototype.hasClasses = function () {
        return this._classes.length > 0;
    };
    Model.prototype.getClass = function (className) {
        return this._map.get(className);
    };
    Model.prototype.addClass = function (_class) {
        if (this._map.get(_class.name) == null) {
            this._map.set(_class.name, _class);
            this._classes.push(_class);
        }
    };
    Model.prototype.addEfferentHierarchyOf = function (_diagramClass) {
        var _refClass = this._map.get(_diagramClass.name);
        if (_refClass) {
            this._addEfferentAssociationClassesOf(_refClass);
            this._addEfferentCompositionClassesOf(_refClass);
            this._addEfferentUseClassesOf(_refClass);
            this._addEfferentInheritClassesOf(_refClass);
        }
    };
    Model.prototype._addEfferentAssociationClassesOf = function (_class) {
        var _this = this;
        _class.getAssociations().forEach(function (_association) {
            _association.classes.forEach(function (_associationClass) {
                _this.addClass(_associationClass);
                _this.addClasses(_associationClass.getEfferentHierarchy());
            });
        });
    };
    Model.prototype._addEfferentCompositionClassesOf = function (_class) {
        var _this = this;
        _class.getCompositions().forEach(function (_composition) {
            _composition.getClasses().forEach(function (_compositionClass) {
                _this.addClass(_compositionClass);
                _this.addClasses(_compositionClass.getEfferentHierarchy());
            });
        });
    };
    Model.prototype._addEfferentUseClassesOf = function (_class) {
        var _this = this;
        _class.getUses().forEach(function (_use) {
            _use.classes.forEach(function (_useClass) {
                _this.addClass(_useClass);
                _this.addClasses(_useClass.getEfferentHierarchy());
            });
        });
    };
    Model.prototype._addEfferentInheritClassesOf = function (_class) {
        var _this = this;
        _class.getInherits().forEach(function (_inheritClass) {
            _this.addClass(_inheritClass);
            _this.addClasses(_inheritClass.getEfferentHierarchy());
        });
    };
    Model.prototype.getAfferentHierarchyTo = function (_diagramClass) {
        var _this = this;
        var _afferentClasses = [];
        var _refClass = this._map.get(_diagramClass.name);
        if (_refClass) {
            this._classes.forEach(function (_class) {
                if (_class.name != _diagramClass.name && _class.hasAnyRelationWith(_diagramClass)) {
                    var _afferentClass = new Class_1.Class(_class.name);
                    _afferentClass.copy(_class);
                    _afferentClasses.push(_afferentClass);
                    _afferentClasses.push.apply(_afferentClasses, _this.getAfferentHierarchyTo(_class));
                }
            });
        }
        return _afferentClasses;
    };
    Model.prototype.addClasses = function (_classes) {
        var _this = this;
        _classes.forEach(function (_class) {
            if (!_this._map.has(_class.name)) {
                _this.addClass(_class);
            }
        });
    };
    Model.prototype.removeClass = function (_class) {
        var _this = this;
        var _index = 0;
        this._classes.forEach(function (__class) {
            if (__class.name.indexOf(_class.name) >= 0) {
                _this._classes.splice(_index, 1);
                _this._map.delete(_class.name);
                return;
            }
            _index++;
        });
    };
    Model.prototype.removeClasses = function (_classes) {
        var _this = this;
        _classes.forEach(function (_class) {
            _this.removeClass(_class);
        });
    };
    Model.prototype.existsClass = function (className) {
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
            _this._map.set(_class.name, _class);
        });
    };
    return Model;
}());
exports.Model = Model;
