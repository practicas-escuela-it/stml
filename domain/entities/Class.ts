import { Association } from "./Asociation";
import { Attribute } from "./Attribute";
import { Composition } from "./Composition";
import { IDiagramObject } from "./IDiagramObject";
import { IVisitor } from "./IVisitor";
import { Identifier } from "./Identifier";
import { Method } from "./Method";
import { Use } from "./Use";

export class Class implements IDiagramObject {                
    
    private _identifier: Identifier;
    // private _inherists: Identifier[];
    private _inherists: Class[];
    private _attributes: Attribute[];
    private _methods: Method[];
    private _compositions: Composition[];
    private _uses: Use[];
    private _associations: Association[];

    constructor(name: string) {
        this._identifier = new Identifier(name);
        this._inherists = [];
        this._attributes = [];
        this._methods = [];
        this._compositions = [];
        this._uses = [];
        this._associations = [];
    }

    get name(): string {
        return this._identifier.value;
    }

    accept(visitor: IVisitor): void {
        visitor.visitClass(this);
    }

    get getIdentifier(): Identifier {
        return this._identifier;
    }
    

    get getAttributes(): Attribute[] {
        return this._attributes;
    }

    hasInherit(): boolean {
        return this._inherists != null && this._inherists.length > 0;
    } 

    getInherits(): Class[] {
        return this._inherists;
    } 

    getMethods(): Method[] {
        return this._methods;
    }

    getCompositions(): Composition[] {
        return this._compositions;
    }

    getUses(): Use[] {
        return this._uses;
    }

    getAssociations(): Association[] {
        return this._associations;
    }

    addAttribute(attribute: Attribute) {
        this._attributes.push(attribute);
    }

  /*  addInherit(identifer: Identifier) {
       this._inherists.push(identifer);
    }   */

    addInherit(_class: Class) {
       this._inherists.push(_class);
    }

    addMethod(method: Method) {
        this._methods.push(method);
    }

    addComposition(composition: Composition) {
        this._compositions.push(composition);
    }

    addUse(use: Use) {
       this._uses.push(use);
    } 

    addAsociation(association: Association) {
        this._associations.push(association);
    } 
}