import { Identifier } from "./Identifier";

export class Composition {
    
    private _identifiers: Identifier[];

    constructor() {
        this._identifiers = [];
    }   

    addIdentifier(name: string) {
        this._identifiers.push(new Identifier(name));
    }

    getIdentifiers(): Identifier[] {
        return this._identifiers;
    }
}