import { DiagramTranslationController } from "./domain/controllers/antonio/GrammarTranslationController";

let grammarTranslationController: DiagramTranslationController = new DiagramTranslationController();
grammarTranslationController.process("domain/controllers/antonio/input.txt");