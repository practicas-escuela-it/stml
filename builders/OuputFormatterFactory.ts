import { Model } from "../domain/entities/Model";
import { OutputFormatType } from "../outputViews/OutputFormatType";
import { OutputFormatter } from "../outputViews/OutputFormatter";
import { PlantUmlOutputFormatter } from "../outputViews/PlantUml/PlantUmlOutputFormatter";

export class OutputFormatterFactory {

    private _formatType: OutputFormatType;

    constructor(formatType: OutputFormatType) {
        this._formatType = formatType;
    }

    build(model: Model): OutputFormatter {
        
        return new PlantUmlOutputFormatter(model);
    }
}