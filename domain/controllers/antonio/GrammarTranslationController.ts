import  *  as fs from "fs";
import { ModelBuilder } from "../../entities/ModelBuilder";
import { OutputBuilder } from "../../../outputViews/OutputBuilder";
import { Class } from "../../entities/Class";
import { Diagram } from "../../entities/Diagram";

export class DiagramTranslationController {
    
    constructor(private outputBuilder: OutputBuilder) {

    }

    process(fileName: string) {
        let fileContent: string = fs.readFileSync(fileName, "utf8");        
        let modelBuilder: ModelBuilder = new ModelBuilder(fileContent);
        let diagram: Diagram = modelBuilder.build();
        console.log(JSON.stringify(diagram));
        fs.writeFileSync("dist/domain/controllers/antonio/output.txt", JSON.stringify(diagram));        
        this.outputBuilder.build(diagram);
    }
}

// Crear una factoría de construcción de clases.
