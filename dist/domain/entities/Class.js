"use strict";
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
        return this._inherists;
    };
    Class.prototype.getMethods = function () {
        return this._methods;
    };
    Class.prototype.getCompositions = function () {
        return this._compositions;
    };
    Class.prototype.getUses = function () {
        return this._uses;
    };
    Class.prototype.getAssociations = function () {
        return this._associations;
    };
    Class.prototype.addAttribute = function (attribute) {
        this._attributes.push(attribute);
    };
    Class.prototype.addInherit = function (_class) {
        this._inherists.push(_class);
    };
    Class.prototype.addMethod = function (method) {
        this._methods.push(method);
    };
    Class.prototype.addComposition = function (composition) {
        this._compositions.push(composition);
    };
    Class.prototype.removeComposition = function (compositionToRemove) {
        var _this = this;
        var i = 0;
        this._compositions.forEach(function (_composition) {
            if (_composition.isEqualTo(compositionToRemove)) {
                _this._compositions.splice(i, 1);
                return;
            }
            i++;
        });
    };
    Class.prototype.addUse = function (use) {
        this._uses.push(use);
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
    Class.prototype._copyInherits = function (inherits) {
        var _this = this;
        inherits.forEach(function (_inherit) {
            var inherit = new Class(_inherit.name);
            inherit.copy(_inherit);
            _this._inherists.push(inherit);
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
    Class.prototype._copyAssociations = function (associations) {
        var _this = this;
        associations.forEach(function (association) {
            var _association = new Asociation_1.Association();
            association.classes.forEach(function (_class) {
                var _copyClass = new Class(_class.name);
                _copyClass.copy(_class);
                _association.addClass(_copyClass);
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
