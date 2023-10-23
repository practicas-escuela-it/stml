import { GrammarTranslationController } from "./domain/controllers/antonio/GrammarTranslationController";

let grammarTranslationController: GrammarTranslationController = new GrammarTranslationController();
grammarTranslationController.process("dist/domain/controllers/antonio/ejem1.txt");