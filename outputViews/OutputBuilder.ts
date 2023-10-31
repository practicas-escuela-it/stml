import { Class } from "../domain/entities/Class";

export interface OutputBuilder {

    build(classes: Class[]): void;        
}