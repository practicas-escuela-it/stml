import { DiagramTranslationController } from "./domain/controllers/GrammarTranslationController";

let grammarTranslationController: DiagramTranslationController = new DiagramTranslationController();
grammarTranslationController.process("domain/controllers/input.txt");