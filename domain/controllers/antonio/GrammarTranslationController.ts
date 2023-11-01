import  *  as fs from "fs";
import { ModelBuilder } from "../../entities/ModelBuilder";
import { OutputFormatter } from '../../../outputViews/OutputFormatter';
import { Class } from "../../entities/Class";
import { Diagram } from "../../entities/Diagram";
import { PlantUmlOutputFormatter } from "../../../outputViews/PlantUmlOutputFormatter";

export class DiagramTranslationController {
    
    constructor() {

    }

    process(fileName: string) {
        let fileContent: string = fs.readFileSync(fileName, "utf8");        
        let modelBuilder: ModelBuilder = new ModelBuilder(fileContent);
        let diagram: Diagram = modelBuilder.build();
        console.log(JSON.stringify(diagram));
        fs.writeFileSync("domain/controllers/antonio/outputModel.txt", JSON.stringify(diagram));        
        let outputFormatter: OutputFormatter = new PlantUmlOutputFormatter(diagram);
        console.log("\nGramática de plantuml. Copiar y pegar en Plantext.com\n\n")
        let plantUmlModel: string = outputFormatter.format();
        console.log(plantUmlModel);
        fs.writeFileSync("domain/controllers/antonio/plantumlModel.txt", plantUmlModel);
    }
}

// Crear una factoría de construcción de clases.
