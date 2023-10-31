"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramTranslationController = void 0;
var fs = require("fs");
var DiagramBuilder_1 = require("../../entities/DiagramBuilder");
var DiagramTranslationController = /** @class */ (function () {
    function DiagramTranslationController(outputBuilder) {
        this.outputBuilder = outputBuilder;
    }
    DiagramTranslationController.prototype.process = function (fileName) {
        var fileContent = fs.readFileSync(fileName, "utf8");
        var grammarBuilder = new DiagramBuilder_1.DiagramBuilder(fileContent);
        var classes = grammarBuilder.build();
        console.log(JSON.stringify(classes));
        fs.writeFileSync("dist/domain/controllers/antonio/output.txt", JSON.stringify(classes));
        this.outputBuilder.build(classes);
    };
    return DiagramTranslationController;
}());
exports.DiagramTranslationController = DiagramTranslationController;
// Crear una factoría de construcción de clases.
