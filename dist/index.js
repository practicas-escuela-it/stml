"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GrammarTranslationController_1 = require("./domain/controllers/antonio/GrammarTranslationController");
var grammarTranslationController = new GrammarTranslationController_1.GrammarTranslationController();
grammarTranslationController.process("dist/domain/controllers/antonio/ejem1.txt");
