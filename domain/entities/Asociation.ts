import { IDiagramObject } from "./IDiagramObject";
import { IVisitor } from "./IVisitor";
import { Identifier } from "./Identifier";

export class Association {
   
    private _identifiers: Identifier[];
    

    constructor() {
        this._identifiers = [];
    }

    get identifiers(): Identifier[] {
        return this._identifiers;
    }   
    
    addIdentifier(identifier: string) {
        this._identifiers.push(new Identifier(identifier));
    }
}