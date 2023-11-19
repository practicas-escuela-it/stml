import { Association } from "../../domain/entities/Asociation";
import { Attribute } from "../../domain/entities/Attribute";
import { Class } from "../../domain/entities/Class";
import { Composition } from "../../domain/entities/Composition";
import { Identifier } from "../../domain/entities/Identifier";
import { Method } from "../../domain/entities/Method";
import { Model } from "../../domain/entities/Model";
import { Parameter } from "../../domain/entities/Parameter";
import { Use } from "../../domain/entities/Use";
import { OutputFormatter } from "../OutputFormatter";

export class JavaOutputFormatter extends OutputFormatter {

    private _output: string;

    constructor(model: Model) {
        super(model);
        this._output = "";
    }

    format(): string {
        this._model.getClasses().forEach(
            (_class: Class) => {
                this.formatClass(_class);
            }
        );
        return this._output;
    }

    private formatClass(_class: Class): void {
        this._output += "class " + _class.name;
        if (_class.hasInherit()) {
            this._output += " extends ";
            this.formatInherits(_class);
        }
        this._output += " { \n";
        this.formatAttributes(_class);                
        this.formatCompositions(_class);
        // this.formatUses(_class);
        this.formatAssociations(_class);
        this.formatMethods(_class);
        this._output += "} \n";
    }

    private formatInherits(_class: Class) {
        let inherit: Class = _class.getInherits()[0];
        this._output += inherit.name;
    }

    private formatAttributes(_class: Class) {
        _class.getAttributes.forEach(
            (_attribute: Attribute) => {
                this._output += "\tprivate ";
                if (_attribute.type.value != "") {
                    this._output += _attribute.type.value;
                } else {
                    this._output += "string";
                }
                this._output += " " + _attribute.identifier.value + ";\n";                
            }
        );
    }

    private formatMethods(_class: Class) {
        _class.getMethods().forEach(
            (_method: Method) => {
                this._output += "\tvoid " + _method.identifier.value + "(";
                if (_method.hasParameters()) {
                    this.insertParameters(_method.parameters);
                }
                this._output += ") { }\n\n";
            }
        );
        this._output += "\n";
    }

    private insertParameters(_parameters: Parameter[]) {
        let _outputLengthBeforeParameters: number = this._output.length;
        _parameters.forEach(
            (_parameter: Parameter) => {
                if (!_parameter.isEmpty()) {                                        
                    if (_parameter.type != null && _parameter.type.value != "") {
                        this._output += _parameter.type.value + " ";
                    } else {
                        this._output += " void ";
                    }
                    this._output += _parameter.identifier.value + ", ";                    
                }
            }
        );
        if (_outputLengthBeforeParameters < this._output.length) {
           this._output = this._output.substring(0, this._output.length - 2);
        }
    }

    private formatCompositions(_class: Class) {
        _class.getCompositions().forEach(
            (composition: Composition) => {
                composition.getClasses().forEach(
                    (identifier: Class) => {                        
                        this._output += "\t private " + identifier.name + " " + identifier.name.toLowerCase() + ";\n";
                    }
                );
            }
        );
    }

    private formatUses(_class: Class) {
        _class.getUses().forEach(
            (use: Use) => {
                use.identifiers.forEach(
                    (_identifier: Identifier) => {
                        this._output += _class.name + " ..> " + _identifier.value + "\n";
                    }
                );
            }
        );
    }

    private formatAssociations(_class: Class) {
        let _associationsInConstructor: string = "\t" + _class.name + "(";
        _class.getAssociations().forEach(
            (association: Association) => {
                association.identifiers.forEach(
                    (_identifier: Identifier) => {                        
                        this._output += "\t" + _identifier.value + " " + _identifier.value.toLowerCase() + ";\n";
                        _associationsInConstructor += _identifier.value + " " + _identifier.value.toLowerCase() + ", ";
                    }
                );
            }
        );
        if (_class.hasAssociations()) {
            _associationsInConstructor = _associationsInConstructor.substring(0, _associationsInConstructor.length - 2);
        }
        _associationsInConstructor += ") {}\n\n";
        this._output += "\n" + _associationsInConstructor;
    }
}