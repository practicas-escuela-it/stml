import { Class } from "../../../entities/Class";

export abstract class RelationClass {
    
    protected _class: Class;
    protected _filteredClass: Class;

    constructor(_class: Class) {
       this._class = _class;       
       this._filteredClass = new Class(_class.name);
    }

    abstract getRelationClasses(): Class[];
}