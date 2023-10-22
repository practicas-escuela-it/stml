import { Identifier } from "./Identifier";

export class Parameter {    
    private _identifier: Identifier;
    private _type: Identifier;

    constructor() {
        this._identifier = new Identifier("");
        this._type = new Identifier("");
    }

    set(identifier: string, type: string) {
        this._identifier = new Identifier(identifier);
        this._type = new Identifier(type);
    }
}