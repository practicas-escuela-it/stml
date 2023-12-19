import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class EfferentInheritRelation extends Relation {

    private _model: Model;

    constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model) {
        super(modelClass, diagramClass, actionType);
        this._model = model;
    }

    override getRelationClasses(): Class[] {
      let _inheritsClasses: Class[] = [];
      _inheritsClasses = this._getModelClassEfferentClasses();
      _inheritsClasses.forEach(
        (_class: Class) => {
           _inheritsClasses.push(..._class.getEfferentHierarchy());
        }
      )
      return _inheritsClasses;
    }

    private _getModelClassEfferentClasses(): Class[] {
      let _classes: Class[] = [];
      this._modelClass.getInherits().forEach(
          (inherit: Class) => {
              let _copyInherit: Class = new Class(inherit.name);
              _copyInherit.copy(inherit);
              _classes.push(_copyInherit);
              this.updateDiagram(_copyInherit);
          });
      return _classes;
    }

    private updateDiagram(_inherit: Class) {
        if (this._actionType == ActionType.ADD) {
           this._diagramClass.addInherit(_inherit);
        } else {
           this._diagramClass.removeInherit(_inherit);
        }
     }
}
