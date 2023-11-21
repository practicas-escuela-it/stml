"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarTranslationController = void 0;
var fs = require("fs");
var ModelBuilder_1 = require("../builders/ModelBuilder");
var OuputFormatterFactory_1 = require("../../outputViews/OuputFormatterFactory");
var OutputFormatType_1 = require("../../outputViews/OutputFormatType");
var DiagramBuilder_1 = require("../builders/Diagram/DiagramBuilder");
var Direction_1 = require("../builders/Diagram/classFilters/Direction");
var Relation_1 = require("../builders/Diagram/Relation");
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
        console.log("\nGramática formateada a java. \n\n");
        outputFormatter = new OuputFormatterFactory_1.OutputFormatterFactory(OutputFormatType_1.OutputFormatType.Java).instance(model);
        var javaModel = outputFormatter.format();
        console.log(javaModel);
        fs.writeFileSync("domain/controllers/javaModel.txt", javaModel);
        plantUmlModel = new DiagramBuilder_1.DiagramBuilder(model, OutputFormatType_1.OutputFormatType.PlantUml)
            .setClass("Piston")
            .coupling(Direction_1.Direction.EFFERENT, Relation_1.Relation.COMPOSITION)
            .coupling(Direction_1.Direction.AFFERENT, Relation_1.Relation.ASSOCIATION)
            .build();
        //  .coupling(Direction.AFFERENT, Relation.ASSOCIATION)
        //  .attribute("")
        //  .method()
        /*  .setClass("A")
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
              .withMethods()  */
        //   .withAfferences()
        //   .withEfferences()
        //   .withAll();
        console.log("\nGramática formateada para plantUml, utilizando DIAGRAM BUILDER\n\n");
        console.log(plantUmlModel);
        fs.writeFileSync("domain/controllers/plantumlModelDiagramBuilder.txt", plantUmlModel);
    };
    return GrammarTranslationController;
}());
exports.GrammarTranslationController = GrammarTranslationController;
// Crear una factoría de construcción de clases.
