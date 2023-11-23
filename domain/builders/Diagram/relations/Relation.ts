import { Class } from "../../../entities/Class";

export abstract class Relation {
    
    protected _class: Class;
    protected _filteredClass: Class;

    constructor(_class: Class, filteredClass: Class) {
       this._class = _class;       
       this._filteredClass = filteredClass;
    }

    abstract getRelationClasses(): Class[];
}