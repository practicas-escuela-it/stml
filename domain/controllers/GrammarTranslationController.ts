import *  as fs from "fs";
import { ModelBuilder } from "../builders/ModelBuilder";
import { OutputFormatter } from '../../outputViews/OutputFormatter';
import { Model } from "../entities/Model";
import { OutputFormatterFactory } from "../../outputViews/OuputFormatterFactory";
import { OutputFormatType } from "../../outputViews/OutputFormatType";

export class GrammarTranslationController {

    constructor() {

    }

    process(fileName: string) {
        let fileContent: string = fs.readFileSync(fileName, "utf8");
        let modelBuilder: ModelBuilder = new ModelBuilder(fileContent);
        let model: Model = modelBuilder.build();
        console.log(JSON.stringify(model));
        fs.writeFileSync("domain/controllers/outputModel.txt", JSON.stringify(model));        
        let outputFormatter: OutputFormatter = new OutputFormatterFactory(OutputFormatType.PlantUml).create(model);
        console.log("\nGramática de plantuml. Copiar y pegar en Plantext.com\n\n")
        let plantUmlModel: string = outputFormatter.format();
        console.log(plantUmlModel);
        fs.writeFileSync("domain/controllers/plantumlModel.txt", plantUmlModel);

        outputFormatter = new OutputFormatterFactory(OutputFormatType.Java).create(model);
        let javaModel: string = outputFormatter.format();
        console.log(javaModel);
        fs.writeFileSync("domain/controllers/javaModel.txt", javaModel);
    }
}

// Crear una factoría de construcción de clases.
