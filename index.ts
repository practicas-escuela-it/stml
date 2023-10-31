import { DiagramTranslationController } from "./domain/controllers/antonio/GrammarTranslationController";
import { OutputBuilderPlantUml } from "./outputViews/OutputBuilderPlantUml";

let grammarTranslationController: DiagramTranslationController = new DiagramTranslationController(new OutputBuilderPlantUml());
grammarTranslationController.process("dist/domain/controllers/antonio/input.txt");