"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputFormatterFactory = void 0;
var PlantUmlOutputFormatter_1 = require("./PlantUml/PlantUmlOutputFormatter");
var OutputFormatterFactory = /** @class */ (function () {
    function OutputFormatterFactory(formatType) {
        this._formatType = formatType;
    }
    OutputFormatterFactory.prototype.build = function (model) {
        return new PlantUmlOutputFormatter_1.PlantUmlOutputFormatter(model);
    };
    return OutputFormatterFactory;
}());
exports.OutputFormatterFactory = OutputFormatterFactory;
