import { Class } from "./Class";

export class Diagram {
    private _classes: Class[];

    constructor() {
        this._classes = [];
    }

    addClass(_class: Class): void {
        this._classes.push(_class);
    }
}