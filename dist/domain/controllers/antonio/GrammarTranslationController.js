"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramTranslationController = void 0;
var fs = require("fs");
var ModelBuilder_1 = require("../../entities/ModelBuilder");
var DiagramTranslationController = /** @class */ (function () {
    function DiagramTranslationController(outputBuilder) {
        this.outputBuilder = outputBuilder;
    }
    DiagramTranslationController.prototype.process = function (fileName) {
        var fileContent = fs.readFileSync(fileName, "utf8");
        var modelBuilder = new ModelBuilder_1.ModelBuilder(fileContent);
        var diagram = modelBuilder.build();
        console.log(JSON.stringify(diagram));
        fs.writeFileSync("dist/domain/controllers/antonio/output.txt", JSON.stringify(diagram));
        this.outputBuilder.build(diagram);
    };
    return DiagramTranslationController;
}());
exports.DiagramTranslationController = DiagramTranslationController;
// Crear una factoría de construcción de clases.
