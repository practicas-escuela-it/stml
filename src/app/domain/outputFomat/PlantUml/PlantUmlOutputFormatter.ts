import { Attribute } from "../../entities/Attribute";
import { Class } from "../../entities/Class";
import { Model } from "../../entities/Model";
import { Method } from "../../entities/Method";
import { Parameter } from "../../entities/Parameter";
import { OutputFormatter } from "../OutputFormatter";
import { Relation } from "../../entities/Relation";

export class PlantUmlOutputFormatter extends OutputFormatter {

    protected _outputForClassesBody: string;
    protected _outputForRelationsBetweenClasses: string;


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

    protected formatClass(_class: Class) {
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

    protected formatInherits(_class: Class) {
        _class.getInherits().forEach(
            (_class: Class) => {
                this._outputForClassesBody += _class.name + ", ";
            }
        );
        this._outputForClassesBody = this._outputForClassesBody.substring(0, this._outputForClassesBody.length - 2);
    }

    protected formatAttributes(_class: Class) {
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

    protected formatMethods(_class: Class) {
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

    protected formatCompositions(_class: Class) {
        _class.getCompositions().forEach(
            (composition: Relation) => {
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

    protected formatUses(_class: Class) {
        _class.getUses().forEach(
            (use: Relation) => {
                use.getClasses().forEach(
                    (_useClass: Class) => {
                        this._outputForRelationsBetweenClasses += _class.name + " ..> " + _useClass.name + "\n";
                    }
                );
            }
        );
    }

    protected formatAssociations(_class: Class) {
        _class.getAssociations().forEach(
            (association: Relation) => {
                association.getClasses().forEach(
                    (_associationClass: Class) => {
                        this._outputForRelationsBetweenClasses += _class.name + " o--> ";
                        if (association.hasMultiplicityWith(_associationClass.name)) {
                          this._outputForRelationsBetweenClasses += "\"" + association.getStartMultiplicity(_associationClass.name) + ".." + association.getEndMultiplicity(_associationClass.name) + "\" ";
                        }
                        this._outputForRelationsBetweenClasses += _associationClass.name + "\n";
                    }
                );
            }
        );
    }
}
