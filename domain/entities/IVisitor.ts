import { Association } from "./Asociation";
import { Attribute } from "./Attribute";
import { Class } from "./Class";
import { Composition } from "./Composition";
import { Diagram } from "./Diagram";
import { IDiagramObject } from "./IDiagramObject";
import { Identifier } from "./Identifier";
import { Method } from "./Method";
import { Use } from "./Use";

export interface IVisitor {
    visitDiagram(diagram: Diagram): void;    
    visitClass(_class: Class): void;    
    visitIdentifier(identifier: Identifier): void;
    visitAttribute(attribute: Attribute): void;
    visitMethod(method: Method): void;
    visitComposition(composition: Composition): void;
    visitUse(use: Use): void;
    visitAssociation(association: Association): void;   
}