import { Class } from "../domain/entities/Class";
import { Model } from "../domain/entities/Model";

export interface OutputFormatter {

    format(): string;        
}