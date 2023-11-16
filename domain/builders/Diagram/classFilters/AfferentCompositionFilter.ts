import { Class } from "../../../entities/Class";
import { Composition } from "../../../entities/Composition";
import { Identifier } from "../../../entities/Identifier";
import { Model } from "../../../entities/Model";
import { ClassElementFilter } from "./ClassElementFilter";
import { ClassFilterActionType } from "./ClassFilterOptionType";

export class AfferentCompositionFilter extends ClassElementFilter {

    private _model: Model;

    constructor(_class: Class, model: Model) {
        super(_class);
        this._model = model;
    }

    getFilteredClasses(): Class[] {
        let _filteredClasses: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                _class.getCompositions().forEach(
                    (_composition: Composition) => {
                       _filteredClasses.push(...this.findAfferentClass(_composition.getIdentifiers(), _class));                        
                    }
                )
            }
        );
        return _filteredClasses;
    }

}