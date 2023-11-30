import { Class } from "../../../entities/Class";
import { Method } from "../../../entities/Method";
import { ElementFilter } from "./ElementFilter";

export class MethodFilter extends ElementFilter {

    constructor(names: string[], originalClass: Class, filteredClass: Class) {
        super(names, originalClass, filteredClass) 
    }

    filter(): void {
        if (this._names.length == 0) {
            this._addAll();
         } else {
            this._add(this._names);
         }
    }
    protected _addAll(): void {
        this._modelClass.getMethods().forEach(
            (method: Method) => {
               let _copyMethod: Method = new Method();
               _copyMethod.setIdentifier(method.identifier.value);
               this._diagramClass.addMethod(_copyMethod);
            }
         );
    }
    protected _add(names: string[]): void {
        names.forEach(
            (name: string) => {
               this._diagramClass.addMethod(this._getOriginalClassMethod(name));
            }
         )
    }
    
    _getOriginalClassMethod(name: string) {
        let result: Method = new Method();
        this._modelClass.getMethods().forEach(
           (method: Method) => {
              if (method.identifier.value == name) {
                 result.setIdentifier(method.identifier.value);
              }
           }
        )
        return result;
    }
}