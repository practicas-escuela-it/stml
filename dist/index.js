"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GrammarTranslationController_1 = require("./domain/controllers/GrammarTranslationController");
var grammarTranslationController = new GrammarTranslationController_1.DiagramTranslationController();
grammarTranslationController.process("domain/controllers/input.txt");
