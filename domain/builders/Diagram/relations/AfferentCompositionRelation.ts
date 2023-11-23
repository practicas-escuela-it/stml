import { Class } from "../../../entities/Class";
import { Composition } from "../../../entities/Composition";
import { Model } from "../../../entities/Model";
import { Relation } from "./Relation";

export class AfferentCompositionRelation extends Relation {
    
    private _model: Model;

    constructor(_class: Class, model: Model, filteredClass: Class) {
        super(_class, filteredClass);
        this._model = model;
     }
 
     getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                if (_class.hasCompositionRelationWith(this._class)) {
                    _classes.push(_class);
                }
            }
        );
        return [this._filteredClass, ..._classes];
     }  
}