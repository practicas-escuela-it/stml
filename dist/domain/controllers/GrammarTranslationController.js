"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarTranslationController = void 0;
var fs = require("fs");
var ModelBuilder_1 = require("../builders/ModelBuilder");
var DiagramBuilder_1 = require("../builders/Diagram/DiagramBuilder");
var Direction_1 = require("../builders/Diagram/types/Direction");
var RelationType_1 = require("../builders/Diagram/types/RelationType");
var ActionType_1 = require("../builders/Diagram/ActionType");
var OuputFormatterFactory_1 = require("../outputFomat/OuputFormatterFactory");
var OutputFormatType_1 = require("../outputFomat/OutputFormatType");
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
            /*  .addClass("A2")
              .addCoupling(new Axis(Direction.EFFERENT, RelationType.INHERIT, 2))
              .removeCoupling(Direction.EFFERENT, RelationType.COMPOSITION)
              .removeClass("Z") */
            .setClass("A2", ActionType_1.ActionType.ADD)
            // .coupling(Direction.EFFERENT, RelationType.INHERIT)
            // .coupling(Direction.EFFERENT, RelationType.ASSOCIATION)
            //  .coupling(Direction.EFFERENT)
            .coupling(Direction_1.Direction.EFFERENT, RelationType_1.RelationType.COMPOSITION)
            //  .coupling(Direction.EFFERENT, RelationType.USE)
            //  .coupling(Direction.AFFERENT, RelationType.INHERIT)
            // .coupling(Direction.AFFERENT, RelationType.COMPOSITION)
            // .coupling(Direction.AFFEa RENT)
            // .coupling(Direction.AFFERENT, RelationType.ASSOCIATION)
            //  .coupling(Direction.AFFERENT, RelationType.USE)
            .attribute()
            .method()
            .build();
        console.log("\nGramática formateada para plantUml, utilizando DIAGRAM BUILDER\n\n");
        console.log(plantUmlModel);
        fs.writeFileSync("domain/controllers/plantumlModelDiagramBuilder.txt", plantUmlModel);
    };
    return GrammarTranslationController;
}());
exports.GrammarTranslationController = GrammarTranslationController;
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
