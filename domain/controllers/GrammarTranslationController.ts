import *  as fs from "fs";
import { ModelBuilder } from "../builders/ModelBuilder";
import { OutputFormatter } from '../../outputViews/OutputFormatter';
import { Model } from "../entities/Model";
import { OutputFormatterFactory } from "../../outputViews/OuputFormatterFactory";
import { OutputFormatType } from "../../outputViews/OutputFormatType";
import { DiagramBuilder } from "../builders/DiagramBuilder";
import { ComparatorType } from "../builders/ComparatorType";

export class GrammarTranslationController {

    constructor() {

    }

    process(fileName: string) {
        let fileContent: string = fs.readFileSync(fileName, "utf8");
        let modelBuilder: ModelBuilder = new ModelBuilder(fileContent);
        let model: Model = modelBuilder.build();
        console.log(JSON.stringify(model));
        fs.writeFileSync("domain/controllers/outputModel.txt", JSON.stringify(model));        
        let outputFormatter: OutputFormatter = new OutputFormatterFactory(OutputFormatType.PlantUml).instance(model);
        console.log("\nGramática formateada a plantuml. Copiar y pegar en Plantext.com\n\n")
        let plantUmlModel: string = outputFormatter.format();
        console.log(plantUmlModel);
        fs.writeFileSync("domain/controllers/plantumlModel.txt", plantUmlModel);

        console.log("\nGramática formateada a java. \n\n")
        outputFormatter = new OutputFormatterFactory(OutputFormatType.Java).instance(model);
        let javaModel: string = outputFormatter.format();
        console.log(javaModel);
        fs.writeFileSync("domain/controllers/javaModel.txt", javaModel);
        
        plantUmlModel = new DiagramBuilder(model, OutputFormatType.PlantUml)
               .addEfferentMetric(ComparatorType.MINOR, 2)
               .addMethodsMetric(ComparatorType.GREATER_OR_EQUAL, 2)
               .build();                     
        console.log("\nGramática formateada para plantUml, utilizando DIAGRAM BUILDER\n\n");
        console.log(plantUmlModel);
        fs.writeFileSync("domain/controllers/plantumlModelDiagramBuilder.txt", plantUmlModel);
        
    }
}

// Crear una factoría de construcción de clases.
