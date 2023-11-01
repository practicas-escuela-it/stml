"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramTranslationController = void 0;
var fs = require("fs");
var ModelBuilder_1 = require("../../entities/ModelBuilder");
var PlantUmlOutputFormatter_1 = require("../../../outputViews/PlantUmlOutputFormatter");
var DiagramTranslationController = /** @class */ (function () {
    function DiagramTranslationController() {
    }
    DiagramTranslationController.prototype.process = function (fileName) {
        var fileContent = fs.readFileSync(fileName, "utf8");
        var modelBuilder = new ModelBuilder_1.ModelBuilder(fileContent);
        var diagram = modelBuilder.build();
        console.log(JSON.stringify(diagram));
        fs.writeFileSync("domain/controllers/antonio/outputModel.txt", JSON.stringify(diagram));
        var outputFormatter = new PlantUmlOutputFormatter_1.PlantUmlOutputFormatter(diagram);
        console.log("\nGramática de plantuml. Copiar y pegar en Plantext.com\n\n");
        var plantUmlModel = outputFormatter.format();
        console.log(plantUmlModel);
        fs.writeFileSync("domain/controllers/antonio/plantumlModel.txt", plantUmlModel);
    };
    return DiagramTranslationController;
}());
exports.DiagramTranslationController = DiagramTranslationController;
// Crear una factoría de construcción de clases.
