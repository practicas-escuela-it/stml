import { Class } from "../../../entities/Class";
import { Identifier } from "../../../entities/Identifier";
import { Use } from "../../../entities/Use";
import { ClassElementFilter } from "./ClassElementFilter";

export class EfferentUseFilter extends ClassElementFilter {

    constructor(_class: Class) {
      super(_class)
    }

    getFilteredElements(): Class[] {        
        let _filteredClass: Class = new Class(this._class.name);
        this._class.getUses().forEach(
            (use: Use) => {
               let _use = new Use();
               use.identifiers.forEach(
                 (identifier: Identifier) => {
                    _use.addIdentifier(identifier.value);
                 }
               )
               _filteredClass.addUse(_use);
            }
        );
        return [_filteredClass];   
    }        
}