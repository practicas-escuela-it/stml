import { Model } from "../entities/Model";
import { JavaOutputFormatter } from "./Java/JavaOutputFormatter";
import { OutputFormatType } from "./OutputFormatType";
import { OutputFormatter } from "./OutputFormatter";
import { PlantUmlOutputFormatter } from "./PlantUml/PlantUmlOutputFormatter";
import { DiagramClassDecorator } from "./PlantUml/diagram-class-decorator";

export class OutputFormatterFactory {

    private _formatType: OutputFormatType;

    constructor(formatType: OutputFormatType) {
        this._formatType = formatType;
    }

    instance(model: Model): OutputFormatter {
        if (this._formatType == OutputFormatType.PlantUml) {
          return new PlantUmlOutputFormatter(model);
        } else if (this._formatType == OutputFormatType.PlantUmlDecorator) {
          console.log("DECORATOR")
          return new DiagramClassDecorator(model);
        } else {
            return new JavaOutputFormatter(model);
        }
    }
}
