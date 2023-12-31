import { Association } from "./Asociation";
import { Attribute } from "./Attribute";
import { Class } from "./Class";
import { Composition } from "./Composition";
import { Model } from "./Model";
import { Identifier } from "./Identifier";
import { Method } from "./Method";
import { Use } from "./Use";

export interface IVisitor {
    visitDiagram(diagram: Model): void;    
    visitClass(_class: Class): void;    
    visitIdentifier(identifier: Identifier): void;
    visitAttribute(attribute: Attribute): void;
    visitMethod(method: Method): void;
    visitComposition(composition: Composition): void;
    visitUse(use: Use): void;
    visitAssociation(association: Association): void;   
}