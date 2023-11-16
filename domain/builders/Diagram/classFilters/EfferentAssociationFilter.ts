import { Association } from "../../../entities/Asociation";
import { Class } from "../../../entities/Class";
import { Identifier } from "../../../entities/Identifier";
import { ClassElementFilter } from "./ClassElementFilter";
import { ClassFilterActionType } from "./ClassFilterOptionType";

export class EfferentAssociationFilter extends ClassElementFilter {

    constructor(_class: Class) {
      super(_class)
    }

    getFilteredClasses(): Class[] {        
        let _filteredClass: Class = new Class(this._class.name);
        this._class.getAssociations().forEach(
            (association: Association) => {
               let _association = new Association();
               association.identifiers.forEach(
                 (identifier: Identifier) => {
                    _association.addIdentifier(identifier.value);
                 }
               )
               _filteredClass.addAsociation(_association);
            }
        );
        return [_filteredClass];   
    }        
}