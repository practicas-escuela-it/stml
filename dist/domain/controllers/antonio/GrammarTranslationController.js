"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarTranslationController = void 0;
var fs = require("fs");
var Analyzer2_1 = require("../../entities/Analyzer2");
var GrammarTranslationController = /** @class */ (function () {
    function GrammarTranslationController() {
    }
    GrammarTranslationController.prototype.process = function (fileName) {
        var fileContent = fs.readFileSync(fileName, "utf8");
        console.log(fileContent);
        var analyzer = new Analyzer2_1.Analyzer2(fileContent);
        analyzer.analyze();
        console.log(JSON.stringify(analyzer.getClasses()));
        fs.writeFileSync("dist/domain/controllers/antonio/ejem1_output.txt", JSON.stringify(analyzer.getClasses()));
    };
    return GrammarTranslationController;
}());
exports.GrammarTranslationController = GrammarTranslationController;
