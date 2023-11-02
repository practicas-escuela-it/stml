import { Model } from "../domain/entities/Model";
import { OutputFormatType } from "./OutputFormatType";
import { OutputFormatter } from "./OutputFormatter";
import { PlantUmlOutputFormatter } from "./PlantUml/PlantUmlOutputFormatter";

export class OutputFormatterFactory {

    private _formatType: OutputFormatType;

    constructor(formatType: OutputFormatType) {
        this._formatType = formatType;
    }

    build(model: Model): OutputFormatter {        
        return new PlantUmlOutputFormatter(model);
    }
}