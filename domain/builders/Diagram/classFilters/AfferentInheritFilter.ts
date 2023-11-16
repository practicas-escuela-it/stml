import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ClassElementFilter } from "./ClassElementFilter";

export class AfferentInheritFilter extends ClassElementFilter {

    private _model: Model;

    constructor(_class: Class, model: Model) {
        super(_class);
        this._model = model;
    }

    getFilteredClasses(): Class[] {
        let _filteredClasses: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                _class.getInherits().forEach(
                    (_inherit: Class) => {
                        if (_inherit.name == this._class.name) {
                           _filteredClasses.push(_class);                
                        }        
                    }
                )
            }
        );
        return _filteredClasses;
    }
}