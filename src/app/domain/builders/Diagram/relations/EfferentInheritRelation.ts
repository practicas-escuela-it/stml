import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class EfferentInheritRelation extends Relation {

    private _model: Model;

    constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model, diagramModel: Model) {
        super(modelClass, diagramClass, actionType, diagramModel);
        this._model = model;
    }

    override applyRelation(): void {
      if (this._actionType == ActionType.ADD) {
        this._diagramModel.addClasses(this._getInheritEfferentClasses());
        this._diagramModel.getClasses().forEach(
          (_class: Class) => {
            this._diagramModel.addEfferentHierarchyOf(_class);
          }
        );
      } else {
        this._diagramModel.removeInheritsOf(this._diagramClass)
      }
    }

    private _getInheritEfferentClasses(): Class[] {
      let _classes: Class[] = [];
      this._diagramClass.removeInherits();
      this._modelClass.getInherits().forEach(
          (inherit: Class) => {
              let _copyInherit: Class = new Class(inherit.name);
              _copyInherit.copy(inherit);
              _classes.push(_copyInherit);
              this._diagramClass.addInherit(_copyInherit);
          });
      return _classes;
    }
}
