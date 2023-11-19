import { Class } from "../../../entities/Class";
import { Identifier } from "../../../entities/Identifier";
import { ClassFilterActionType } from './ClassFilterOptionType';

export abstract class ClassElementFilter {
   
    protected _class: Class;    

    constructor(_class: Class) {
       this._class = _class;       
    }

    abstract getFilteredElements(): Class[];

    protected findAfferentClass(identifiers: Identifier[], _class: Class): Class[] {
        let _filteredClasses: Class[] = [];
        identifiers.forEach(
            (identifier: Identifier) => {
                if (identifier.value == this._class.name) {
                    _filteredClasses.push(_class);
                }
            }
        );
        return _filteredClasses;
    }
}