"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
var Asociation_1 = require("./Asociation");
var Attribute_1 = require("./Attribute");
var Composition_1 = require("./Composition");
var Identifier_1 = require("./Identifier");
var Method_1 = require("./Method");
var Use_1 = require("./Use");
var Class = /** @class */ (function () {
    function Class(name) {
        this._identifier = new Identifier_1.Identifier(name);
        this._inherists = [];
        this._attributes = [];
        this._methods = [];
        this._compositions = [];
        this._uses = [];
        this._associations = [];
    }
    Class.prototype.empty = function () {
        this._inherists = [];
        this._attributes = [];
        this._methods = [];
        this._compositions = [];
        this._uses = [];
        this._associations = [];
    };
    Object.defineProperty(Class.prototype, "name", {
        get: function () {
            return this._identifier.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "getIdentifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "getAttributes", {
        get: function () {
            return this._attributes;
        },
        enumerable: false,
        configurable: true
    });
    Class.prototype.hasInherit = function () {
        return this._inherists != null && this._inherists.length > 0;
    };
    Class.prototype.hasAssociations = function () {
        return this._associations != null && this._associations.length > 0;
    };
    Class.prototype.getInherits = function () {
        var _classes = [];
        this._inherists.forEach(function (_class) {
            _classes.push(_class);
            _classes.push.apply(_classes, _class.getEfferentHierarchy());
        });
        return this._inherists;
    };
    Class.prototype.getMethods = function () {
        return this._methods;
    };
    Class.prototype.getCompositions = function () {
        return this._compositions;
    };
    Class.prototype.getEfferentHierarchy = function () {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], this.getAssociationClasses(), true), this.getCompositionClasses(), true), this.getUseClasses(), true), this.getInherits(), true);
    };
    Class.prototype.getCompositionClasses = function () {
        var _classes = [];
        this._compositions.forEach(function (_composition) {
            _composition.getClasses().forEach(function (_class) {
                _classes.push(_class);
                _classes.push.apply(_classes, _class.getEfferentHierarchy());
            });
        });
        return _classes;
    };
    Class.prototype.getUses = function () {
        return this._uses;
    };
    Class.prototype.getUseClasses = function () {
        var _classes = [];
        this._uses.forEach(function (_use) {
            _use.classes.forEach(function (_class) {
                _classes.push(_class);
                _classes.push.apply(_classes, _class.getEfferentHierarchy());
            });
        });
        return _classes;
    };
    Class.prototype.getAssociations = function () {
        return this._associations;
    };
    Class.prototype.getAssociationClasses = function () {
        var _classes = [];
        this._associations.forEach(function (_association) {
            _association.classes.forEach(function (_class) {
                _classes.push(_class);
                _classes.push.apply(_classes, _class.getEfferentHierarchy());
            });
        });
        return _classes;
    };
    Class.prototype.addAttribute = function (attribute) {
        this._attributes.push(attribute);
    };
    Class.prototype.removeAttribute = function (attributeToRemove) {
        this.removeAttributeByName(attributeToRemove.identifier.value);
    };
    Class.prototype.removeAttributeByName = function (attributeName) {
        var _this = this;
        var i = 0;
        this._attributes.forEach(function (_attribute) {
            if (_attribute.identifier.value == attributeName) {
                _this._attributes.splice(i, 1);
                return;
            }
            i++;
        });
    };
    Class.prototype.addInherit = function (_class) {
        this._inherists.push(_class);
    };
    Class.prototype.removeInherit = function (_class) {
        var _this = this;
        var i = 0;
        this._inherists.forEach(function (_inherit) {
            if (_inherit.name == _class.name) {
                _this._inherists.splice(i, 1);
                return;
            }
            i++;
        });
    };
    Class.prototype.addMethod = function (method) {
        this._methods.push(method);
    };
    Class.prototype.removeMethod = function (method) {
        this.removeMethodByName(method.identifier.value);
    };
    Class.prototype.removeMethodByName = function (methodName) {
        var _this = this;
        var i = 0;
        this._methods.forEach(function (method) {
            if (method.identifier.value == methodName) {
                _this._methods.splice(i, 1);
                return;
            }
            i++;
        });
    };
    Class.prototype.addComposition = function (composition) {
        this._compositions.push(composition);
    };
    Class.prototype.removeComposition = function (compositionToRemove) {
        var _this = this;
        var i = 0;
        this._compositions.forEach(function (_composition) {
            if (_composition.isEqualTo(compositionToRemove)) {
                _composition.removeClasses();
                _this._compositions.splice(i, 1);
                return;
            }
            i++;
        });
    };
    Class.prototype.addUse = function (use) {
        this._uses.push(use);
    };
    Class.prototype.removeUse = function (useToRemove) {
        var _this = this;
        var i = 0;
        this._uses.forEach(function (_use) {
            if (_use.isEqualTo(useToRemove)) {
                _this._uses.splice(i, 1);
                return;
            }
            i++;
        });
    };
    Class.prototype.addAsociation = function (association) {
        this._associations.push(association);
    };
    Class.prototype.removeAssociation = function (associationToRemove) {
        var _this = this;
        var i = 0;
        this._associations.forEach(function (_association) {
            if (_association.isEqualTo(associationToRemove)) {
                _this._associations.splice(i, 1);
                return;
            }
            i++;
        });
    };
    Class.prototype.copy = function (_classToCopy) {
        this._copyIdentifier(_classToCopy._identifier);
        this._copyInherits(_classToCopy._inherists);
        this._copyMethods(_classToCopy._methods);
        this._copyAttributes(_classToCopy._attributes);
        this._copyAssociations(_classToCopy._associations);
        this._copyCompositions(_classToCopy._compositions);
        this._copyUses(_classToCopy._uses);
    };
    Class.prototype._copyIdentifier = function (identifier) {
        this._identifier = new Identifier_1.Identifier(identifier.value);
    };
    Class.prototype._copyInherits = function (inheritsToCopy) {
        var _this = this;
        inheritsToCopy.forEach(function (_classToCopy) {
            var _class = new Class(_classToCopy.name);
            _class.copy(_classToCopy);
            _this._inherists.push(_class);
        });
    };
    Class.prototype._copyMethods = function (methods) {
        var _this = this;
        methods.forEach(function (_method) {
            var method = new Method_1.Method();
            method.setIdentifier(_method.identifier.value);
            _this._methods.push(method);
            _method.parameters.forEach(function (_parameter) {
                method.addParameter(_parameter.identifier.value, _parameter.type.value);
            });
        });
    };
    Class.prototype._copyAttributes = function (attributes) {
        var _this = this;
        attributes.forEach(function (attribute) {
            var _attribute = new Attribute_1.Attribute();
            _attribute.set(attribute.identifier.value, attribute.type.value);
            _this._attributes.push(_attribute);
        });
    };
    Class.prototype._copyAssociations = function (associationsToCopy) {
        var _this = this;
        associationsToCopy.forEach(function (associationToCopy) {
            var _association = new Asociation_1.Association();
            associationToCopy.classes.forEach(function (_classToCopy) {
                var _class = new Class(_classToCopy.name);
                _class.copy(_classToCopy);
                _association.addClass(_class);
            });
            _this._associations.push(_association);
        });
    };
    Class.prototype._copyCompositions = function (compositions) {
        var _this = this;
        compositions.forEach(function (composition) {
            var _composition = new Composition_1.Composition();
            composition.getClasses().forEach(function (_class) {
                var _copyClass = new Class(_class.name);
                _copyClass.copy(_class);
                _composition.addClass(_copyClass);
            });
            _this._compositions.push(_composition);
        });
    };
    Class.prototype._copyUses = function (uses) {
        var _this = this;
        uses.forEach(function (use) {
            var _use = new Use_1.Use();
            use.classes.forEach(function (_class) {
                var _copyClass = new Class(_class.name);
                _copyClass.copy(_class);
                _use.addClass(_copyClass);
            });
            _this._uses.push(_use);
        });
    };
    Class.prototype.hasAnyRelationWith = function (_classToSearch) {
        return this.hasAssociationRelationWith(_classToSearch) || this.hasCompositionRelationWith(_classToSearch) || this.hasInheritRelationWith(_classToSearch) || this.hasUseRelationWith(_classToSearch);
    };
    Class.prototype.hasCompositionRelationWith = function (_classToSearch) {
        var result = false;
        this._compositions.forEach(function (composition) {
            composition.getClasses().forEach(function (_class) {
                if (_class.name.trim() == _classToSearch.name.trim()) {
                    result = true;
                }
            });
        });
        return result;
    };
    Class.prototype.hasAssociationRelationWith = function (_classToSearch) {
        var result = false;
        this._associations.forEach(function (association) {
            association.classes.forEach(function (_class) {
                if (_class.name.trim() == _classToSearch.name.trim()) {
                    result = true;
                }
            });
        });
        return result;
    };
    Class.prototype.hasUseRelationWith = function (_classToSearch) {
        var result = false;
        this._uses.forEach(function (use) {
            use.classes.forEach(function (_class) {
                if (_class.name == _classToSearch.name) {
                    result = true;
                }
            });
        });
        return result;
    };
    Class.prototype.hasInheritRelationWith = function (_class) {
        var result = false;
        this._inherists.forEach(function (inherit) {
            if (inherit.name == _class.name) {
                result = true;
            }
        });
        return result;
    };
    return Class;
}());
exports.Class = Class;
