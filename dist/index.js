"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GrammarTranslationController_1 = require("./domain/controllers/antonio/GrammarTranslationController");
var OutputBuilderPlantUml_1 = require("./outputViews/OutputBuilderPlantUml");
var grammarTranslationController = new GrammarTranslationController_1.DiagramTranslationController(new OutputBuilderPlantUml_1.OutputBuilderPlantUml());
grammarTranslationController.process("dist/domain/controllers/antonio/input.txt");
