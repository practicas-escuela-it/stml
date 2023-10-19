import { Identifier } from "./Identifier";

export class Parameter {
    private _identifier: Identifier;
    private _type: Identifier;

    constructor() {
        this._identifier = new Identifier("");
        this._type = new Identifier("");
    }
}