import { Model } from "../domain/entities/Model";
import { JavaOutputFormatter } from "./Java/JavaOutputFormatter";
import { OutputFormatType } from "./OutputFormatType";
import { OutputFormatter } from "./OutputFormatter";
import { PlantUmlOutputFormatter } from "./PlantUml/PlantUmlOutputFormatter";

export class OutputFormatterFactory {

    private _formatType: OutputFormatType;

    constructor(formatType: OutputFormatType) {
        this._formatType = formatType;
    }

    instance(model: Model): OutputFormatter {        
        if (this._formatType == OutputFormatType.PlantUml) {
          return new PlantUmlOutputFormatter(model);
        } else {
            return new JavaOutputFormatter(model);
        }
    }
}