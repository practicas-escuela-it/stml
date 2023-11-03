import *  as fs from "fs";
import { ModelBuilder } from "../builders/ModelBuilder";
import { OutputFormatter } from '../../outputViews/OutputFormatter';
import { Model } from "../entities/Model";
import { PlantUmlOutputFormatter } from "../../outputViews/PlantUml/PlantUmlOutputFormatter";
import { OutputFormatterFactory } from "../../outputViews/OuputFormatterFactory";
import { OutputFileType } from "typescript";
import { OutputFormatType } from "../../outputViews/OutputFormatType";

export class DiagramTranslationController {

    constructor() {

    }

    process(fileName: string) {
        let fileContent: string = fs.readFileSync(fileName, "utf8");
        let modelBuilder: ModelBuilder = new ModelBuilder(fileContent);
        let model: Model = modelBuilder.build();
        console.log(JSON.stringify(model));
        fs.writeFileSync("domain/controllers/outputModel.txt", JSON.stringify(model));        
        let outputFormatter: OutputFormatter = new OutputFormatterFactory(OutputFormatType.PlantUml).build(model);
        console.log("\nGramática de plantuml. Copiar y pegar en Plantext.com\n\n")
        let plantUmlModel: string = outputFormatter.format();
        console.log(plantUmlModel);
        fs.writeFileSync("domain/controllers/plantumlModel.txt", plantUmlModel);
    }
}

// Crear una factoría de construcción de clases.
