import { IDiagramObject } from "./IDiagramObject";
import { IVisitor } from "./IVisitor";
import { Identifier } from "./Identifier";

export class Composition implements IDiagramObject {
    
    private _identifiers: Identifier[];

    constructor() {
        this._identifiers = [];
    }

    accept(visitor: IVisitor): void {
        visitor.visitComposition(this);
    }

    addIdentifier(name: string) {
        this._identifiers.push(new Identifier(name));
    }
}