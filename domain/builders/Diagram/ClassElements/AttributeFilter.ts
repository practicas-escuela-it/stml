import { Attribute } from "../../../entities/Attribute";
import { Class } from "../../../entities/Class";
import { ElementFilter } from "./ElementFilter";

export class AttributeFilter extends ElementFilter {    

    constructor(names: string[], originalClass: Class, filteredClass: Class) {
        super(names, originalClass, filteredClass) 
    }

    override filter(): void {
        if (this._names.length == 0) {
            this._addAll();
         } else {
            this._add(this._names);
         }
    }

    protected override _addAll(): void {
        this._modelClass.getAttributes.forEach(
           (attribute: Attribute) => {
              let _copyAttr: Attribute = new Attribute(attribute);
              // _copyAttr.set(attribute.identifier.value, attribute.type.value);
              this._diagramClass.addAttribute(_copyAttr);
           }
        );
     }
  
     protected override _add(names: string[]): void {
        names.forEach(
           (name: string) => {
              this._diagramClass.addAttribute(this._getOriginalClassAttribute(name));
           }
        )
     }
  
     private _getOriginalClassAttribute(name: string): Attribute {
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
}