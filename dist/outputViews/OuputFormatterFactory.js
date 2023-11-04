"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputFormatterFactory = void 0;
var JavaOutputFormatter_1 = require("./Java/JavaOutputFormatter");
var OutputFormatType_1 = require("./OutputFormatType");
var PlantUmlOutputFormatter_1 = require("./PlantUml/PlantUmlOutputFormatter");
var OutputFormatterFactory = /** @class */ (function () {
    function OutputFormatterFactory(formatType) {
        this._formatType = formatType;
    }
    OutputFormatterFactory.prototype.instance = function (model) {
        if (this._formatType == OutputFormatType_1.OutputFormatType.PlantUml) {
            return new PlantUmlOutputFormatter_1.PlantUmlOutputFormatter(model);
        }
        else {
            return new JavaOutputFormatter_1.JavaOutputFormatter(model);
        }
    };
    return OutputFormatterFactory;
}());
exports.OutputFormatterFactory = OutputFormatterFactory;
