import { DiagramTranslationController } from "./domain/controllers/antonio/GrammarTranslationController";
import { PlantUmlOutputFormatter } from "./outputViews/PlantUmlOutputFormatter";

let grammarTranslationController: DiagramTranslationController = new DiagramTranslationController();
grammarTranslationController.process("domain/controllers/antonio/input.txt");