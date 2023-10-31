import { Class } from "./Class";
import { IDiagramObject } from "./IDiagramObject";
import { IVisitor } from "./IVisitor";

export class Diagram implements IDiagramObject {
    private _classes: Class[];

    constructor() {        
        this._classes = [];
    }

    getClasses(): Class[] {
        return this._classes;
    }

    accept(visitor: IVisitor): void {
        visitor.visitDiagram(this);
    }

    addClass(_class: Class): void {
        this._classes.push(_class);
    }
    
}