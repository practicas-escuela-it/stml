import { Class } from "../../../entities/Class";

export abstract class Relation {
    
    protected _modelClass: Class;
    protected _diagramClass: Class;

    constructor(_class: Class, diagramClass: Class) {
       this._modelClass = _class;       
       this._diagramClass = diagramClass;
    }

    abstract getRelationClasses(): Class[];
}