import  *  as fs from "fs";
import { Analyzer2 } from "../../entities/Analyzer2";

export class GrammarTranslationController {
    
    constructor() {

    }

    process(fileName: string) {
        let fileContent: string = fs.readFileSync(fileName, "utf8");
        console.log(fileContent);
        let analyzer: Analyzer2 = new Analyzer2(fileContent);
        analyzer.analyze();
        console.log(JSON.stringify(analyzer.getClasses()));
        fs.writeFileSync("dist/domain/controllers/antonio/ejem1_output.txt", JSON.stringify(analyzer.getClasses()));        
    }
}