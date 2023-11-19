import { Class } from "./Class";
import { Identifier } from "./Identifier";

export class Use {    
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