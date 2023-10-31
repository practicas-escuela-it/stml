import { IDiagramObject } from "./IDiagramObject";
import { IVisitor } from "./IVisitor";
import { Identifier } from "./Identifier";

export class Use implements IDiagramObject {    
    private _identifiers: Identifier[];

    constructor() {
        this._identifiers = [];
    }
    accept(visitor: IVisitor): void {
        visitor.visitUse(this);
    }

    addIdentifier(identifier: string) {
        this._identifiers.push(new Identifier(identifier));
    }
}