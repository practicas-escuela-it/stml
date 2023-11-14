import { Class } from "../../entities/Class";
import { Method } from "../../entities/Method";
import { Model } from "../../entities/Model";
import { Parameter } from "../../entities/Parameter";
import { Metric } from "./Metric";

export class MetricParameter extends Metric {

    private _parametersByMethod: Map<string, Parameter[]>;

    constructor(model: Model) {
        super(model);
        this._parametersByMethod = new Map<string, Parameter[]>();
        this.calculate();
    }

    calculate(): void {
       this._model.getClasses().forEach(
        (_class: Class) => {           
           _class.getMethods().forEach(
            (_method: Method) => {
                this._parametersByMethod.set(_method.identifier.value, _method.parameters);
            }
           );
        }
       );
    }

    getValueOf(_methodName: string): number {
        let parameters: Parameter[] | undefined = this._parametersByMethod.get(_methodName);        
        if (parameters != null) {
           return parameters.length;
        }
        return 0;
    }
    
}