"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantUmlOutputFormatter = void 0;
var OutputFormatter_1 = require("../OutputFormatter");
var PlantUmlOutputFormatter = /** @class */ (function (_super) {
    __extends(PlantUmlOutputFormatter, _super);
    function PlantUmlOutputFormatter(model) {
        var _this = _super.call(this, model) || this;
        _this._outputForClassesBody = "";
        _this._outputForRelationsBetweenClasses = "";
        return _this;
    }
    PlantUmlOutputFormatter.prototype.format = function () {
        var _this = this;
        this._model.getClasses().forEach(function (_class) {
            _this.formatClass(_class);
        });
        return "@startuml\n\n" + this._outputForClassesBody + this._outputForRelationsBetweenClasses + "\n@enduml\n";
    };
    PlantUmlOutputFormatter.prototype.formatClass = function (_class) {
        this._outputForClassesBody += "class " + _class.name;
        if (_class.hasInherit()) {
            this._outputForClassesBody += " extends ";
            this.formatInherits(_class);
        }
        this._outputForClassesBody += " { \n";
        this.formatAttributes(_class);
        this.formatMethods(_class);
        this._outputForClassesBody += "} \n";
        this.formatCompositions(_class);
        this.formatUses(_class);
        this.formatAssociations(_class);
    };
    PlantUmlOutputFormatter.prototype.formatInherits = function (_class) {
        var _this = this;
        _class.getInherits().forEach(function (_class) {
            _this._outputForClassesBody += _class.name + ", ";
        });
        this._outputForClassesBody = this._outputForClassesBody.substring(0, this._outputForClassesBody.length - 2);
    };
    PlantUmlOutputFormatter.prototype.formatAttributes = function (_class) {
        var _this = this;
        _class.getAttributes.forEach(function (_attribute) {
            _this._outputForClassesBody += "-" + _attribute.identifier.value;
            if (_attribute.type.value != "") {
                _this._outputForClassesBody += ": " + _attribute.type.value;
            }
            else {
                _this._outputForClassesBody += ": void";
            }
            _this._outputForClassesBody += "\n";
        });
    };
    PlantUmlOutputFormatter.prototype.formatMethods = function (_class) {
        var _this = this;
        _class.getMethods().forEach(function (_method) {
            _this._outputForClassesBody += "+" + _method.identifier.value + "(";
            if (_method.hasParameters()) {
                _this.insertParameters(_method.parameters);
            }
            _this._outputForClassesBody += ")\n";
        });
        this._outputForClassesBody += "\n";
    };
    PlantUmlOutputFormatter.prototype.insertParameters = function (_parameters) {
        var _this = this;
        var _outputLengthBeforeParameters = this._outputForClassesBody.length;
        _parameters.forEach(function (_parameter) {
            if (!_parameter.isEmpty()) {
                _this._outputForClassesBody += _parameter.identifier.value;
                if (_parameter.type != null && _parameter.type.value != "") {
                    _this._outputForClassesBody += ": " + _parameter.type.value;
                }
                else {
                    _this._outputForClassesBody += ": void";
                }
                _this._outputForClassesBody += ", ";
            }
        });
        if (_outputLengthBeforeParameters < this._outputForClassesBody.length) {
            this._outputForClassesBody = this._outputForClassesBody.substring(0, this._outputForClassesBody.length - 2);
        }
    };
    PlantUmlOutputFormatter.prototype.formatCompositions = function (_class) {
        var _this = this;
        _class.getCompositions().forEach(function (composition) {
            composition.getClasses().forEach(function (compositionClass) {
                _this._outputForRelationsBetweenClasses += _class.name + " *--> " + compositionClass.name + "\n";
            });
        });
    };
    PlantUmlOutputFormatter.prototype.formatUses = function (_class) {
        var _this = this;
        _class.getUses().forEach(function (use) {
            use.identifiers.forEach(function (_identifier) {
                _this._outputForRelationsBetweenClasses += _class.name + " ..> " + _identifier.value + "\n";
            });
        });
    };
    PlantUmlOutputFormatter.prototype.formatAssociations = function (_class) {
        var _this = this;
        _class.getAssociations().forEach(function (association) {
            association.identifiers.forEach(function (_identifier) {
                _this._outputForRelationsBetweenClasses += _class.name + " o--> " + _identifier.value + "\n";
            });
        });
    };
    return PlantUmlOutputFormatter;
}(OutputFormatter_1.OutputFormatter));
exports.PlantUmlOutputFormatter = PlantUmlOutputFormatter;
