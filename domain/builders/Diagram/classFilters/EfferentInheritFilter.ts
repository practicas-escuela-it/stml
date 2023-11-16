import { Class } from "../../../entities/Class";
import { ClassElementFilter } from "./ClassElementFilter";

export class EfferentInheritFilter extends ClassElementFilter {

    constructor(_class: Class) {
      super(_class)
    }

    getFilteredClasses(): Class[] {
        let _filteredClass: Class = new Class(this._class.name);
        this._class.getInherits().forEach(
            (_inherit: Class) => {               
               _filteredClass.addInherit(_inherit);
            }
        );
        return [_filteredClass];
    }
}