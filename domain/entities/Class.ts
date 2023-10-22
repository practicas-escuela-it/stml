import { Asociation } from "./Asociation";
import { Attribute } from "./Attribute";
import { Composition } from "./Composition";
import { Identifier } from "./Identifier";
import { Method } from "./Method";
import { Use } from "./Use";

export class Class {       
    
    private _identifier: Identifier;
    private _inherists: Identifier[];
    private _attributes: Attribute[];
    private _methods: Method[];
    private _compositions: Composition[];
    private _uses: Use[];
    private _asociations: Asociation[];

    constructor(name: string) {
        this._identifier = new Identifier(name);
        this._inherists = [];
        this._attributes = [];
        this._methods = [];
        this._compositions = [];
        this._uses = [];
        this._asociations = [];
    }

    get getIdentifier(): Identifier {
        return this._identifier;
    }

    get getInherits(): Identifier[] {
        return this._inherists;
    }

    get getAttributes(): Attribute[] {
        return this._attributes;
    }

    addAttribute(attribute: Attribute) {
        this._attributes.push(attribute);
    }

    addIdentifierInherit(identifer: Identifier) {
       this._inherists.push(identifer);
    }  

    addMethod(method: Method) {
        this._methods.push(method);
    }

    addComposition(composition: Composition) {
        this._compositions.push(composition);
    }
}