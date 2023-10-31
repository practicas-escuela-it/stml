import { Association } from "../domain/entities/Asociation";
import { Attribute } from "../domain/entities/Attribute";
import { Class } from "../domain/entities/Class";
import { Composition } from "../domain/entities/Composition";
import { Diagram } from "../domain/entities/Diagram";
import { IDiagramObject } from "../domain/entities/IDiagramObject";
import { IVisitor } from "../domain/entities/IVisitor";
import { Identifier } from "../domain/entities/Identifier";
import { Method } from "../domain/entities/Method";
import { Use } from "../domain/entities/Use";

export class PlantUmlVisitor implements IVisitor {
    
    private _output: string;

    constructor() {
        this._output = "";
    }

    visitDiagram(diagram: Diagram): void {
        diagram.getClasses().forEach(
            (_class: Class) => {
              this.visitClass(_class);
            }
        )
    }

    visitClass(_class: Class): void {
        this._output += "class " + _class.name;
        if (_class.hasInherit()) {
            this._output += " extends "
           _class.getInherits().forEach(
            (_class: Class) => {
                this._output += _class.name + " ";
            }
           )
        }
        this._output += "{ ";
    }

    visitIdentifier(identifier: Identifier): void {
        
    }

    visitAttribute(attribute: Attribute): void {
        
    }

    visitMethod(method: Method): void {
        
    }

    visitComposition(composition: Composition): void {
        
    }

    visitUse(use: Use): void {
        
    }

    visitAssociation(association: Association): void {
        
    }
       
    
}