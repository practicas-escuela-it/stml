import { Attribute } from "../../entities/Attribute";
import { Class } from "../../entities/Class";
import { Model } from "../../entities/Model";
import { Metric } from "./Metric"

export class MetricAttribute extends Metric {

    private _attributesByClass: Map<string, string[]>;

    constructor(model: Model) {
       super(model);
       this._attributesByClass = new Map<string, string[]>;
       this.calculate();
    }

    calculate(): void {
        this._model.getClasses().forEach(
            (_class: Class) => {
               let _attributes: string[] = [];
               _class.getAttributes.forEach(
                (_attribute: Attribute) => {
                   _attributes.push(_attribute.identifier.value);
                }
               );
               this._attributesByClass.set(_class.name, _attributes);
            }
        )
    }
    
    getValueOf(_className: string): number {
        let _attributes: string[] | undefined = this._attributesByClass.get(_className);
        if (_attributes != undefined) {
            return _attributes.length;
        }
        return 0;
    }

}