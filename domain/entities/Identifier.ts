import { IDiagramObject } from "./IDiagramObject";
import { IVisitor } from "./IVisitor";

export class Identifier implements IDiagramObject {
    private _value: string;

    constructor(value: string) {
        this._value = value.trim();
    }
    accept(visitor: IVisitor): void {
        visitor.visitIdentifier(this);
    }

    get value(): string {
        return this._value;
    }
}