import { Identifier } from "./Identifier";

export class Use {    
    private _identifiers: Identifier[];

    constructor() {
        this._identifiers = [];
    }

    addIdentifier(identifier: string) {
        this._identifiers.push(new Identifier(identifier));
    }
}