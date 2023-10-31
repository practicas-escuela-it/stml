import { IVisitor } from "./IVisitor";

export interface IDiagramObject {
    accept(visitor: IVisitor): void;          
}