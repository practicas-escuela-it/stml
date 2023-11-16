import { Class } from "../../../entities/Class";
import { Composition } from "../../../entities/Composition";
import { Identifier } from "../../../entities/Identifier";
import { ClassElementFilter } from "./ClassElementFilter";
import { ClassFilterActionType } from "./ClassFilterOptionType";

export class EfferentCompositionFilter extends ClassElementFilter {

    constructor(_class: Class) {
      super(_class)
    }

    getFilteredClasses(): Class[] {
        let _filteredClass: Class = new Class(this._class.name);
        this._class.getCompositions().forEach(
            (composition: Composition) => {
               let _composition = new Composition();
               composition.getIdentifiers().forEach(
                 (identifier: Identifier) => {
                    _composition.addIdentifier(identifier.value);
                 }
               )
               _filteredClass.addComposition(_composition);
            }
        );
        return [_filteredClass];
    }
    
}