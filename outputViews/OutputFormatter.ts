import { Class } from "../domain/entities/Class";
import { Diagram } from "../domain/entities/Diagram";

export interface OutputFormatter {

    format(): string;        
}