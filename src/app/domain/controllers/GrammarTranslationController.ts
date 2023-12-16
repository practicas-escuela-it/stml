import *  as fs from "fs";
import { ModelBuilder } from "../builders/ModelBuilder";
import { Model } from "../entities/Model";
import { DiagramBuilder } from "../builders/Diagram/DiagramBuilder";
import { Direction } from "../builders/Diagram/types/Direction";
import { RelationType } from "../builders/Diagram/types/RelationType";
import { ActionType } from "../builders/Diagram/ActionType";
import { OutputFormatterFactory } from "../outputFomat/OuputFormatterFactory";
import { OutputFormatter } from "../outputFomat/OutputFormatter";
import { OutputFormatType } from "../outputFomat/OutputFormatType";
import { Axis } from "../builders/Diagram/relations/Axis";

export class GrammarTranslationController {

    readonly _basePath: string = "src/app/";

    process(fileName: string) {
        let fileContent: string = fs.readFileSync(fileName, "utf8");
        let modelBuilder: ModelBuilder = new ModelBuilder(fileContent);
        let model: Model = modelBuilder.build();

        console.log(JSON.stringify(model));
        fs.writeFileSync(this._basePath + "domain/controllers/outputModel.txt", JSON.stringify(model));
        let outputFormatter: OutputFormatter = new OutputFormatterFactory(OutputFormatType.PlantUml).instance(model);
        console.log("\nGramática formateada a plantuml. Copiar y pegar en Plantext.com\n\n")
        let plantUmlModel: string = outputFormatter.format();
        console.log(plantUmlModel);
        fs.writeFileSync(this._basePath + "domain/controllers/plantumlModel.txt", plantUmlModel);

        console.log("\nGramática formateada a java. \n\n")
        outputFormatter = new OutputFormatterFactory(OutputFormatType.Java).instance(model);
        let javaModel: string = outputFormatter.format();
        console.log(javaModel);
        fs.writeFileSync(this._basePath + "domain/controllers/javaModel.txt", javaModel);

       plantUmlModel = new DiagramBuilder(model, OutputFormatType.PlantUml)
       /*  .addClass("A2")
            .addCoupling(new Axis(Direction.EFFERENT, RelationType.INHERIT, 2))
            .removeCoupling(Direction.EFFERENT, RelationType.COMPOSITION)
            .removeClass("Z") */
               .addClass("A2")
                 // .coupling(Direction.EFFERENT, RelationType.INHERIT)
                 // .coupling(Direction.EFFERENT, RelationType.ASSOCIATION)
                //  .coupling(Direction.EFFERENT)
                 // .withCoupling(new Axis(Direction.ALL, RelationType.ALL))
                  .withCoupling(new Axis(Direction.EFFERENT, RelationType.ASSOCIATION))
                 // .coupling(Direction.EFFERENT, RelationType.USE)
                //  .coupling(Direction.AFFERENT, RelationType.INHERIT)
                // .coupling(Direction.AFFERENT, RelationType.COMPOSITION)
                // .coupling(Direction.AFFERENT)
                // .coupling(Direction.AFFERENT, RelationType.ASSOCIATION)
                //  .coupling(Direction.AFFERENT, RelationType.USE)
                  .withAttribute()
                  .withMethod()
                .build();

        console.log("\nGramática formateada para plantUml, utilizando DIAGRAM BUILDER\n\n");
        console.log(plantUmlModel);
        fs.writeFileSync(this._basePath + "domain/controllers/plantumlModelDiagramBuilder.txt", plantUmlModel);
    }
}

// Crear una factoría de construcción de clases.


 /*  plantUmlModel = new DiagramBuilder1(model, OutputFormatType.PlantUml)
               .setClass("Car")
                 .coupling
                   .efferent
                    .association
                    .composition
                   .afferent
                    .composition
                 .attribute() */
