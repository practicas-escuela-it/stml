"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarTranslationController = void 0;
var fs = require("fs");
var ModelBuilder_1 = require("../builders/ModelBuilder");
var OuputFormatterFactory_1 = require("../../outputViews/OuputFormatterFactory");
var OutputFormatType_1 = require("../../outputViews/OutputFormatType");
var GrammarTranslationController = /** @class */ (function () {
    function GrammarTranslationController() {
    }
    GrammarTranslationController.prototype.process = function (fileName) {
        var fileContent = fs.readFileSync(fileName, "utf8");
        var modelBuilder = new ModelBuilder_1.ModelBuilder(fileContent);
        var model = modelBuilder.build();
        console.log(JSON.stringify(model));
        fs.writeFileSync("domain/controllers/outputModel.txt", JSON.stringify(model));
        var outputFormatter = new OuputFormatterFactory_1.OutputFormatterFactory(OutputFormatType_1.OutputFormatType.PlantUml).instance(model);
        console.log("\nGramática formateada a plantuml. Copiar y pegar en Plantext.com\n\n");
        var plantUmlModel = outputFormatter.format();
        console.log(plantUmlModel);
        fs.writeFileSync("domain/controllers/plantumlModel.txt", plantUmlModel);
        /*
                console.log("\nGramática formateada a java. \n\n")
                outputFormatter = new OutputFormatterFactory(OutputFormatType.Java).instance(model);
                let javaModel: string = outputFormatter.format();
                console.log(javaModel);
                fs.writeFileSync("domain/controllers/javaModel.txt", javaModel); */
        /*
           let plantUmlModel: string = new DiagramBuilder(model, OutputFormatType.PlantUml)
                  .setClass("Engine")
                    // .coupling(Direction.EFFERENT, Relation.Composition)
                   //  .attribute("<nombre>")
                   //  .method()
                  .setClass("A")
                  .setClass("B")
                  .setClass("C")
                      .withCompositions(Direction.EFFERENT)
                      .withCompositions(Direction.AFFERENT)
                      .withAssociations(Direction.EFFERENT)
                      .withAttributes()
                      .withMethods()
   
                   .setClass("X")
                      .withCompositions(Direction.EFFERENT)
                      .withCompositions(Direction.AFFERENT)
                      .withAssociations(Direction.EFFERENT)
                      .withAttributes()
                      .withMethods()
                   //   .withAfferences()
                   //   .withEfferences()
                   //   .withAll();
                  .build();     */
        /*    console.log("\nGramática formateada para plantUml, utilizando DIAGRAM BUILDER\n\n");
            console.log(plantUmlModel);
            fs.writeFileSync("domain/controllers/plantumlModelDiagramBuilder.txt", plantUmlModel);
          */
    };
    return GrammarTranslationController;
}());
exports.GrammarTranslationController = GrammarTranslationController;
// Crear una factoría de construcción de clases.
