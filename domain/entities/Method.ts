import { IDiagramObject } from "./IDiagramObject";
import { IVisitor } from "./IVisitor";
import { Identifier } from "./Identifier";
import { Parameter } from './Parameter';

export class Method implements IDiagramObject {    
    private _identifier: Identifier;
    private _parameters: Parameter[];

    constructor() {
        this._identifier = new Identifier("");
        this._parameters = [];
    }
    accept(visitor: IVisitor): void {
        visitor.visitMethod(this);
    }

    setIdentifier(identifier: string) {
        this._identifier = new Identifier(identifier);
    }

    addParameter(identifier: string, type: string) {
        let parameter = new Parameter();
        parameter.set(identifier, type);
        this._parameters.push(parameter);
    }
}