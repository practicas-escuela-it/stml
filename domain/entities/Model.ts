import { Class } from "./Class";

export class Model {
    private _classes: Class[];

    constructor() {        
        this._classes = [];
    }

    getClasses(): Class[] {
        return this._classes;
    }
  
    addClass(_class: Class): void {
        this._classes.push(_class);
    }   
}