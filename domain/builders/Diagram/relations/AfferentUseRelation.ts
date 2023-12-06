import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { Relation } from "./Relation";

export class AfferentUseRelation extends Relation {

    private _model: Model;

    constructor(_class: Class, model: Model, filteredClass: Class) {
       super(_class, filteredClass);
       this._model = model;
       this._diagramClass = new Class(this._modelClass.name);
    }

    getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                if (_class.hasUseRelationWith(this._modelClass)) {
                    _classes.push(_class);
                }
            }
        );
        return _classes;
    }   
    
}