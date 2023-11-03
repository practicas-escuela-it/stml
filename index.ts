import { GrammarTranslationController } from "./domain/controllers/GrammarTranslationController";

let grammarTranslationController: GrammarTranslationController = new GrammarTranslationController();
grammarTranslationController.process("domain/controllers/input.txt");