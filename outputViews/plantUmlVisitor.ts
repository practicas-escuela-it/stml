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
    
    private _outputForClassesBody: string;
    private _outputRelationsBetweenClasses: string;
    private _classNameInProcess: string;

    constructor() {
        this._outputForClassesBody = "";
        this._outputRelationsBetweenClasses = "";
        this._classNameInProcess = "";
    }

    visitDiagram(diagram: Diagram): void {
        diagram.getClasses().forEach(
            (_class: Class) => {
              this.visitClass(_class);
            }
        );        
    }

    visitClass(_class: Class): void {
        this._outputForClassesBody += "class " + _class.name;
        if (_class.hasInherit()) {
            this._outputForClassesBody += " extends "
            this.outputInherits(_class);
        }
        this._outputForClassesBody += " { \n";
        this.outputAttributes(_class);
        this.outputMethods(_class);
        this.outputCompositions(_class);
        this.outputUses(_class);
        this.outputAssociations(_class);
        this._outputForClassesBody += "} \n";
    }

    private outputInherits(_class: Class): void {
        _class.getInherits().forEach(
            (_class: Class) => {
                this._outputForClassesBody += _class.name + ", ";
            }
           );
        this._outputForClassesBody = this._outputForClassesBody.substring(0, this._outputForClassesBody.length - 2);
    }

    private outputAttributes(_class: Class): void {
        _class.getAttributes.forEach(
            (_attribute: Attribute) => {
                this.visitAttribute(_attribute);
            }
        )
    }

    private outputMethods(_class: Class): void {
        _class.getMethods().forEach(
            (_method: Method) => {
                this.visitMethod(_method);
            }
        )
    }

    private outputCompositions(_class: Class): void {
        _class.getCompositions().forEach(
            (composition: Composition) => {
                this._classNameInProcess = _class.name;
                this.visitComposition(composition);
            }
        )
    }

    private outputUses(_class: Class): void {

    }

    private outputAssociations(_class: Class): void {

    }

    visitIdentifier(identifier: Identifier): void {
        
    }

    visitAttribute(attribute: Attribute): void {
        
    }

    visitMethod(method: Method): void {
        
    }

    visitComposition(composition: Composition): void {
        composition.getIdentifiers().forEach(
            (identifier: Identifier) => {
              this._outputRelationsBetweenClasses +=  this._classNameInProcess + " *--> " + identifier.value + "\n";
            }
        )
    }

    visitUse(use: Use): void {
        
    }

    visitAssociation(association: Association): void {
        
    }
       
    
}