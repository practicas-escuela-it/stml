import { Model } from "../../domain/entities/Model";
import { OutputFormatter } from "../OutputFormatter";

export class JavaOutputFormatter extends OutputFormatter {    

    constructor(model: Model) {
       super(model);
    }

    format(): string {
        return "";
    }

}