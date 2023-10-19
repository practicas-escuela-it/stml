import { Identifier } from "./Identifier";
import { Parameter } from "./Parameter";

export class Method {
    private _identifier: Identifier;
    private _parameters: Parameter[];

    constructor() {
        this._identifier = new Identifier("");
        this._parameters = [];
    }
}