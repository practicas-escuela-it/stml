"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantUmlOutputFormatter = void 0;
var PlantUmlOutputFormatter = /** @class */ (function () {
    function PlantUmlOutputFormatter(diagram) {
        this._diagram = diagram;
        this._outputForClassesBody = "";
        this._outputForRelationsBetweenClasses = "";
    }
    PlantUmlOutputFormatter.prototype.format = function () {
        var _this = this;
        this._diagram.getClasses().forEach(function (_class) {
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
            composition.getIdentifiers().forEach(function (identifier) {
                _this._outputForRelationsBetweenClasses += _class.name + " *--> " + identifier.value + "\n";
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
}());
exports.PlantUmlOutputFormatter = PlantUmlOutputFormatter;
