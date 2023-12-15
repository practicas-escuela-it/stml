"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Class_1 = require("./Class");
var Model = /** @class */ (function () {
    function Model() {
        this._classes = new Map();
    }
    Model.prototype.getClasses = function () {
        var _classes = [];
        if (this._classes.size > 0) {
            this._classes.forEach(function (value, key) {
                _classes.push(value);
            });
        }
        return _classes;
    };
    Model.prototype.hasClasses = function () {
        return this._classes.size > 0;
    };
    Model.prototype.getClass = function (className) {
        return this._classes.get(className);
    };
    Model.prototype.addClass = function (_class) {
        if (!this._classes.has(_class.name)) {
            this._classes.set(_class.name, _class);
        }
    };
    Model.prototype.addEfferentHierarchyOf = function (_diagramClass) {
        var _refClass = this._classes.get(_diagramClass.name);
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
    Model.prototype.getEfferentHierarchyOf = function (_settedClass) {
        var _this = this;
        var _afferentClasses = [];
        var _refClass = this._classes.get(_settedClass.name);
        if (_refClass) {
            this._classes.forEach(function (_class) {
                _afferentClasses.push.apply(_afferentClasses, _this.getEfferentAssociationsOf(_class));
                _afferentClasses.push.apply(_afferentClasses, _this.getEfferentCompositionsOf(_class));
                _afferentClasses.push.apply(_afferentClasses, _this.getEfferentUsesOf(_class));
                _afferentClasses.push.apply(_afferentClasses, _this.getEfferentInheritsOf(_class));
            });
        }
        return _afferentClasses;
    };
    Model.prototype.getEfferentAssociationsOf = function (_class) {
        var _afferentClasses = [];
        _class.getAssociations().forEach(function (association) {
            association.classes.forEach(function (_class) {
                _afferentClasses.push(_class);
            });
        });
        return _afferentClasses;
    };
    Model.prototype.getEfferentCompositionsOf = function (_class) {
        var _afferentClasses = [];
        _class.getCompositions().forEach(function (composition) {
            composition.getClasses().forEach(function (_class) {
                _afferentClasses.push(_class);
            });
        });
        return _afferentClasses;
    };
    Model.prototype.getEfferentUsesOf = function (_class) {
        var _afferentClasses = [];
        _class.getUses().forEach(function (use) {
            use.classes.forEach(function (_class) {
                _afferentClasses.push(_class);
            });
        });
        return _afferentClasses;
    };
    Model.prototype.getEfferentInheritsOf = function (_class) {
        return _class.getInherits();
    };
    Model.prototype.getAfferentHierarchyTo = function (_diagramClass) {
        var _this = this;
        var _afferentClasses = [];
        var _refClass = this._classes.get(_diagramClass.name);
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
            if (!_this._classes.has(_class.name)) {
                _this.addClass(_class);
            }
        });
    };
    Model.prototype.removeClass = function (_class) {
        var _index = 0;
        if (this._classes.has(_class.name)) {
            this._classes.delete(_class.name);
        }
    };
    Model.prototype.removeClasses = function (_classes) {
        var _this = this;
        _classes.forEach(function (_class) {
            _this.removeClass(_class);
        });
    };
    Model.prototype.existsClass = function (className) {
        return this._classes.has(className);
    };
    Model.prototype.copy = function (model) {
        var _this = this;
        model.getClasses().forEach(function (_classToCopy) {
            var _class = new Class_1.Class(_classToCopy.name);
            _class.copy(_classToCopy);
            _this._classes.set(_class.name, _class);
        });
    };
    return Model;
}());
exports.Model = Model;
