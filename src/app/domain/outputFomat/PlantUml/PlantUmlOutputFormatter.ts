import { Association } from "../../entities/Asociation";
import { Attribute } from "../../entities/Attribute";
import { Class } from "../../entities/Class";
import { Composition } from "../../entities/Composition";
import { Model } from "../../entities/Model";
import { Identifier } from "../../entities/Identifier";
import { Method } from "../../entities/Method";
import { Parameter } from "../../entities/Parameter";
import { Use } from "../../entities/Use";
import { OutputFormatter } from "../OutputFormatter";

export class PlantUmlOutputFormatter extends OutputFormatter {

    private _outputForClassesBody: string;
    private _outputForRelationsBetweenClasses: string;


    constructor(model: Model) {
        super(model);
        this._outputForClassesBody = "";
        this._outputForRelationsBetweenClasses = "";
    }

    format(): string {
        this._model.getClasses().forEach(
            (_class: Class) => {
                this.formatClass(_class);
            }
        );
        return "@startuml\n\n" + this._outputForClassesBody + this._outputForRelationsBetweenClasses + "\n@enduml\n";
    }

    private formatClass(_class: Class) {
        this._outputForClassesBody += "class " + _class.name;
        if (_class.hasInherit()) {
            this._outputForClassesBody += " extends "
            this.formatInherits(_class);
        }
        this._outputForClassesBody += " { \n";
        this.formatAttributes(_class);
        this.formatMethods(_class);
        this._outputForClassesBody += "} \n";
        this.formatCompositions(_class);
        this.formatUses(_class);
        this.formatAssociations(_class);
    }

    private formatInherits(_class: Class) {
        _class.getInherits().forEach(
            (_class: Class) => {
                this._outputForClassesBody += _class.name + ", ";
            }
        );
        this._outputForClassesBody = this._outputForClassesBody.substring(0, this._outputForClassesBody.length - 2);
    }

    private formatAttributes(_class: Class) {
        _class.getAttributes.forEach(
            (_attribute: Attribute) => {
                this._outputForClassesBody += "-" + _attribute.identifier.value;
                if (_attribute.type.value != "") {
                    this._outputForClassesBody += ": " + _attribute.type.value;
                } else {
                    this._outputForClassesBody += ": void";
                }
                this._outputForClassesBody += "\n";
            }
        );
    }

    private formatMethods(_class: Class) {
        _class.getMethods().forEach(
            (_method: Method) => {
                this._outputForClassesBody += "+" + _method.identifier.value + "(";
                if (_method.hasParameters()) {
                    this.insertParameters(_method.parameters);
                }
                this._outputForClassesBody += ")\n";
            }
        );
        this._outputForClassesBody += "\n";
    }

    private insertParameters(_parameters: Parameter[]) {
        let _outputLengthBeforeParameters: number = this._outputForClassesBody.length;
        _parameters.forEach(
            (_parameter: Parameter) => {
                if (!_parameter.isEmpty()) {
                    this._outputForClassesBody += _parameter.identifier.value;
                    if (_parameter.type != null && _parameter.type.value != "") {
                        this._outputForClassesBody += ": " + _parameter.type.value;
                    } else {
                        this._outputForClassesBody += ": void";
                    }
                    this._outputForClassesBody += ", "
                }
            }
        );
        if (_outputLengthBeforeParameters < this._outputForClassesBody.length) {
           this._outputForClassesBody = this._outputForClassesBody.substring(0, this._outputForClassesBody.length - 2);
        }
    }

    private formatCompositions(_class: Class) {
        _class.getCompositions().forEach(
            (composition: Composition) => {
                composition.getClasses().forEach(
                    (compositionClass: Class) => {
                        this._outputForRelationsBetweenClasses += _class.name + " *--> ";
                        if (composition.hasMultiplicityWith(compositionClass.name)) {
                          this._outputForRelationsBetweenClasses += "\"" + composition.getStartMultiplicity(compositionClass.name) + ".." + composition.getEndMultiplicity(compositionClass.name) + "\" ";
                        }
                        this._outputForRelationsBetweenClasses += compositionClass.name + "\n";
                    }
                );
            }
        );
    }

    private formatUses(_class: Class) {
        _class.getUses().forEach(
            (use: Use) => {
                use.classes.forEach(
                    (_useClass: Class) => {
                        this._outputForRelationsBetweenClasses += _class.name + " ..> " + _useClass.name + "\n";
                    }
                );
            }
        );
    }

    private formatAssociations(_class: Class) {
        _class.getAssociations().forEach(
            (association: Association) => {
                association.classes.forEach(
                    (_associationClass: Class) => {
                        this._outputForRelationsBetweenClasses += _class.name + " o--> " + _associationClass.name + "\n";
                    }
                );
            }
        );
    }
}
