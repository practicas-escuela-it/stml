import { Class } from "../../../entities/Class";
import { Composition } from "../../../entities/Composition";
import { Identifier } from "../../../entities/Identifier";
import { ClassElementFilter } from "./ClassElementFilter";
import { ClassFilterActionType } from "./ClassFilterOptionType";

export class EfferentCompositionFilter extends ClassElementFilter {

    constructor(_class: Class) {
      super(_class)
    }

    getFilteredElements(): Class[] {
        let _filteredClass: Class = new Class(this._class.name);
        this._class.getCompositions().forEach(
            (composition: Composition) => {
               let _composition = new Composition();
               composition.getClasses().forEach(
                 (identifier: Identifier) => {
                    _composition.addClass(identifier.value);
                 }
               )
               _filteredClass.addComposition(_composition);
            }
        );
        return [_filteredClass];
    }
    
}