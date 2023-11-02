"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramTranslationController = void 0;
var fs = require("fs");
var ModelBuilder_1 = require("../builders/ModelBuilder");
var PlantUmlOutputFormatter_1 = require("../../outputViews/PlantUml/PlantUmlOutputFormatter");
var DiagramTranslationController = /** @class */ (function () {
    function DiagramTranslationController() {
    }
    DiagramTranslationController.prototype.process = function (fileName) {
        var fileContent = fs.readFileSync(fileName, "utf8");
        var modelBuilder = new ModelBuilder_1.ModelBuilder(fileContent);
        var model = modelBuilder.build();
        console.log(JSON.stringify(model));
        fs.writeFileSync("domain/controllers/outputModel.txt", JSON.stringify(model));
        var outputFormatter = new PlantUmlOutputFormatter_1.PlantUmlOutputFormatter(model);
        console.log("\nGramática de plantuml. Copiar y pegar en Plantext.com\n\n");
        var plantUmlModel = outputFormatter.format();
        console.log(plantUmlModel);
        fs.writeFileSync("domain/controllers/plantumlModel.txt", plantUmlModel);
    };
    return DiagramTranslationController;
}());
exports.DiagramTranslationController = DiagramTranslationController;
// Crear una factoría de construcción de clases.
