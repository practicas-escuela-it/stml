import  *  as fs from "fs";
import { DiagramBuilder } from "../../entities/DiagramBuilder";
import { OutputBuilder } from "../../../outputViews/OutputBuilder";
import { Class } from "../../entities/Class";

export class DiagramTranslationController {
    
    constructor(private outputBuilder: OutputBuilder) {

    }

    process(fileName: string) {
        let fileContent: string = fs.readFileSync(fileName, "utf8");        
        let grammarBuilder: DiagramBuilder = new DiagramBuilder(fileContent);
        let classes: Class[] = grammarBuilder.build();
        console.log(JSON.stringify(classes));
        fs.writeFileSync("dist/domain/controllers/antonio/output.txt", JSON.stringify(classes));        
        this.outputBuilder.build(classes);
    }
}

// Crear una factoría de construcción de clases.
