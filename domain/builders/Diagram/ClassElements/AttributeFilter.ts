import { Attribute } from "../../../entities/Attribute";
import { Class } from "../../../entities/Class";
import { ActionType } from "../ActionType";
import { ElementFilter } from "./ElementFilter";

export class AttributeFilter extends ElementFilter {   

   constructor(names: string[], originalClass: Class, filteredClass: Class, actionType: ActionType) {
      super(names, originalClass, filteredClass, actionType)
   }

   override filter(): void {
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

   protected override _addAll(): void {
      this._modelClass.getAttributes.forEach(
         (attribute: Attribute) => {
            if (attribute.identifier.value != "") {
               let _copyAttr: Attribute = new Attribute();
               _copyAttr.set(attribute.identifier.value, attribute.identifier.value);
               // _copyAttr.set(attribute.identifier.value, attribute.type.value);
               this._diagramClass.addAttribute(_copyAttr);
            }
         }
      );
   }

   protected override _add(names: string[]): void {
      names.forEach(
         (name: string) => {
            let searchedAttribute: Attribute = this._getModelClassAttribute(name);
            if (searchedAttribute.identifier.value != "") {
               this._diagramClass.addAttribute(this._getModelClassAttribute(name));
            }
         }
      )
   }   

   private _getModelClassAttribute(name: string): Attribute {
      let result: Attribute = new Attribute();
      this._modelClass.getAttributes.forEach(
         (attribute: Attribute) => {
            if (attribute.identifier.value == name) {
               result.set(attribute.identifier.value, attribute.type.value);
            }
         }
      )
      return result;
   }

   protected _removeAll(): void {
      this._modelClass.getAttributes.forEach(
         (attribute: Attribute) => {
            if (attribute.identifier.value != "") {
               this._diagramClass.removeAttribute(attribute);
            }
         });
   }
   protected _remove(names: string[]): void {
      names.forEach(
         (name: string) => {
            this._diagramClass.removeAttributeByName(name);
         }
      )
   }
}