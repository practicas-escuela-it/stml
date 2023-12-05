import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { Relation } from "./Relation";

export class AfferentAssociationRelation extends Relation {
    
    private _model: Model;

    constructor(_class: Class, model: Model, filteredClass: Class) {
        super(_class, filteredClass);
        this._model = model;
     }
 
     getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {                
                if (_class.name != this._modelClass.name && _class.hasAssociationRelationWith(this._modelClass) == true) {
                    console.log("Class afferente " + _class.name)
                    _classes.push(_class);                    
                }
            }
        );
        return [this._diagramClass, ..._classes];
     }  
}