import { IDiagramObject } from "./IDiagramObject";
import { IVisitor } from "./IVisitor";

export class Identifier {
    private _value: string;

    constructor(value: string) {
        this._value = value.trim();
    }   

    get value(): string {
        return this._value;
    }
}