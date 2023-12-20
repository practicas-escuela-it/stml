import { Class } from "src/app/domain/entities/Class";
import { Model } from "src/app/domain/entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "../relations/Relation";

export class ClassFilter extends Relation {


  constructor(_modelClass: Class, diagramClass: Class, diagramModel: Model, actionType: ActionType) {
    super(_modelClass, diagramClass, actionType, diagramModel);
  }

  override applyRelation(): void {
      let _classToRemove: Class = this._diagramModel.getClass(this._modelClass.name);
      console.log("POR AQUI")
      _classToRemove.removeAssociations();
      _classToRemove.removeCompositions();
      _classToRemove.removeUses();
      _classToRemove.removeInherits();
      let _afferentClasses: Class[] = this._diagramModel.getAfferentHierarchyTo(_classToRemove);
      _afferentClasses.forEach(
        (_class: Class) => {
          // Aqui buscar la class a remove y quitarla de la lista de clase efferente
          _class.removeEfferentClass(_classToRemove);
        }
      )
      this._diagramModel.removeClass(_classToRemove);
    }
}
