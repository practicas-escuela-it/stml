import { Identifier } from "./Identifier";
import { Parameter } from './Parameter';

export class Method {    
    private _identifier: Identifier;
    private _parameters: Parameter[];

    constructor() {
        this._identifier = new Identifier("");
        this._parameters = [];
    }

    get identifier(): Identifier {
        return this._identifier;
    }

    get parameters(): Parameter[] {
       return this._parameters;
    }   

    setIdentifier(identifier: string) {
        this._identifier = new Identifier(identifier);
    }

    addParameter(identifier: string, type: string) {
        let parameter = new Parameter();
        parameter.set(identifier, type);
        this._parameters.push(parameter);
    }

    hasParameters(): boolean {
        return this._parameters.length > 0;
    }
}