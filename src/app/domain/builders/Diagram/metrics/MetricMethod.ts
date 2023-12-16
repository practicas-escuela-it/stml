import { Attribute } from "../../../entities/Attribute";
import { Class } from "../../../entities/Class";
import { Method } from "../../../entities/Method";
import { Model } from "../../../entities/Model";
import { Parameter } from "../../../entities/Parameter";
import { Metric } from "./Metric";

export class MetricMethod extends Metric {

    private _methodsByClass: Map<string, Method[]>;

    constructor(model: Model) {
        super(model);
        this._methodsByClass = new Map<string, Method[]>();
        this.calculate();
    }

    calculate(): void {
        this._model.getClasses().forEach(
            (_class: Class) => {
              let _methods: Method[] = []
              _class.getMethods().forEach(
                (_method: Method) => {
                  _methods.push(_method);
                }
              );
              this._methodsByClass.set(_class.name, _methods);
            }
        );
    }
    
    getValueOf(_className: string): number {
        let _methods: Method[] | undefined = this._methodsByClass.get(_className);
        if (_methods != undefined && _methods.length > 0) {
            return _methods.length;
        }
        return 0;
    }
    
}