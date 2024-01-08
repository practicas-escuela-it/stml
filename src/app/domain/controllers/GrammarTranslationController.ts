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

    plantUmlModel = new DiagramBuilder(model, OutputFormatType.DiagramClassDecorator)
      .addClass("A1")
      //.addCoupling(new Axis(Direction.EFFERENT, RelationType.ALL))
      //.addCoupling(new Axis(Direction.AFFERENT, RelationType.ALL))
      .addCoupling(new Axis(Direction.ALL))
      //.removeCoupling(new Axis(Direction.EFFERENT, RelationType.COMPOSITION))
      // .removeCoupling(new Axis(Direction.AFFERENT, RelationType.COMPOSITION))
     // .removeClass("A0")
     // .removeClass("A8")
      .addAttribute()
      .addMethod()
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
