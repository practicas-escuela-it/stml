import { Class } from "./Class";

export class Composition {
    
    private _classes: Class[];

    constructor() {
        this._classes = [];
    }   

    addClass(_class: Class) {
        this._classes.push(_class);
    }

    getClasses(): Class[] {
        return this._classes;
    }
}