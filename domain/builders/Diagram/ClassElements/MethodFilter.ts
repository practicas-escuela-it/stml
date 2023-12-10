import { Class } from "../../../entities/Class";
import { Method } from "../../../entities/Method";
import { Parameter } from "../../../entities/Parameter";
import { ActionType } from "../ActionType";
import { ElementFilter } from "./ElementFilter";

export class MethodFilter extends ElementFilter {

   constructor(names: string[], originalClass: Class, filteredClass: Class, actionType: ActionType) {
      super(names, originalClass, filteredClass, actionType);
   }

   filter(): void {
      if (this._actionType == ActionType.ADD) {
         if (this._names.length == 0) {
            this._addAll();
         } else {
            this._add(this._names);
         }
      } else {
         if (this._names.length == 0) {
            this._removeAll();
         } else {
            this._remove(this._names);
         }
      }
   }
   protected _addAll(): void {
      this._modelClass.getMethods().forEach(
         (method: Method) => {
            if (method.identifier.value != "") {
               let _copyMethod: Method = new Method();
               _copyMethod.setIdentifier(method.identifier.value);               
               method.parameters.forEach(
                  (parameter: Parameter) => {                    
                    _copyMethod.addParameter(parameter.identifier.value, parameter.type.value);
                  }
               )
               this._diagramClass.addMethod(_copyMethod);
            }
         }
      );
   }
   protected _add(names: string[]): void {
      names.forEach(
         (name: string) => {
            let searchedMethod: Method = this._getOriginalClassMethod(name);
            if (searchedMethod.identifier.value != "") {
               this._diagramClass.addMethod(this._getOriginalClassMethod(name));
            }
         }
      )
   }

   _getOriginalClassMethod(name: string): Method {
      let result: Method = new Method();
      this._modelClass.getMethods().forEach(
         (method: Method) => {
            if (method.identifier.value == name) {
               method.parameters.forEach(
                  (parameter: Parameter) => {                    
                    result.addParameter(parameter.identifier.value, parameter.type.value);
                  }
               )
               result.setIdentifier(method.identifier.value);
            }
         }
      )
      return result;
   }

   protected _removeAll(): void {
      this._modelClass.getMethods().forEach(
         (method: Method) => {
            if (method.identifier.value != "") {
               this._diagramClass.removeMethod(method);
            }
         });
   }
   protected _remove(names: string[]): void {
      names.forEach(
         (name: string) => {
            this._diagramClass.removeMethodByName(name);
         }
      )
   }
}