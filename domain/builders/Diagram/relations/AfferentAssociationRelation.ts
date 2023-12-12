import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class AfferentAssociationRelation extends Relation {

    private _model: Model;

    constructor(modelClass: Class, model: Model, diagramClass: Class, _actionType: ActionType) {
        super(modelClass, diagramClass, _actionType);
        this._model = model;
    }

    getRelationClasses(): Class[] {                
        return this._getRelationClasses(this._modelClass);        
    }

    private _getRelationClasses(_settedClass: Class): Class[] {
        let _classes: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                if (_class.name != _settedClass.name && _class.hasAssociationRelationWith(_settedClass)) {            
                    _classes.push(_class);
                    _classes.push(...this._getRelationClasses(_class));
                }
            }
        );       
        return _classes;
    }

    
}