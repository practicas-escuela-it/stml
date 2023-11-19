import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { Use } from "../../../entities/Use";
import { ClassElementFilter } from "./ClassElementFilter";

export class AfferentUseFilter extends ClassElementFilter {

    private _model: Model;

    constructor(_class: Class, model: Model) {
        super(_class);
        this._model = model;
    }

    getFilteredElements(): Class[] {
        let _filteredClasses: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
              if (_class.name != this._class.name) {
                _class.getUses().forEach(
                    (_use: Use) => {
                       _filteredClasses.push(...this.findAfferentClass(_use.identifiers, _class));                        
                    }
                )
              }
            }
        );
        return _filteredClasses;
    }

}