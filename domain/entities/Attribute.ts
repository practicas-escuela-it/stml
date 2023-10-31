import { IDiagramObject } from "./IDiagramObject";
import { IVisitor } from "./IVisitor";
import { Identifier } from "./Identifier";

export class Attribute implements IDiagramObject {
    private _identifier: Identifier;
    private _type: Identifier;

    constructor() {
        this._identifier = new Identifier("");
        this._type = new Identifier("");
    }
    accept(visitor: IVisitor): void {
        visitor.visitAttribute(this);
    }

    set(identifier: string, type: string) {
        this._identifier = new Identifier(identifier);
        this._type = new Identifier(type);
    }
}