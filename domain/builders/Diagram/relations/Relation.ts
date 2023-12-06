import { Class } from "../../../entities/Class";
import { ActionType } from "../ActionType";

export abstract class Relation {
    
    protected _modelClass: Class;
    protected _diagramClass: Class;    
    protected _actionType: ActionType;

    constructor(_class: Class, _diagramClass: Class, _actionType: ActionType) {
       this._modelClass = _class;       
       this._diagramClass = _diagramClass;       
       this._actionType = _actionType;
    }

    abstract getRelationClasses(): Class[]; 
}