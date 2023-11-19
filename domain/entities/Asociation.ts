import { Class } from "./Class";

export class Association {
   
    private _classes: Class[];

    constructor() {
        this._classes = [];
    }

    get classes(): Class[] {
        return this._classes;
    }   
    
    addClass(_class: Class) {
        this._classes.push(_class);
    }
}