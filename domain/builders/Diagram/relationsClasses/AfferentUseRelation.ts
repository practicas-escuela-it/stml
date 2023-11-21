import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { RelationClass } from "./RelationClass";

export class AfferentUseRelation extends RelationClass {

    private _model: Model;

    constructor(_class: Class, model: Model) {
       super(_class);
       this._model = model;
       this._filteredClass = new Class(this._class.name);
    }

    getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                if (_class.hasUseRelationWith(this._class)) {
                    _classes.push(_class);
                }
            }
        );
        return [this._filteredClass, ..._classes];
    }   
    
}