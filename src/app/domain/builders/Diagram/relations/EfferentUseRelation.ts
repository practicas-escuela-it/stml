import { Class } from "../../../entities/Class";
import { Use } from "../../../entities/Use";
import { Relation } from "./Relation";
import { ActionType } from '../ActionType';
import { Model } from "../../../entities/Model";

export class EfferentUseRelation extends Relation {

   private _model: Model;

    constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model, diagramModel: Model) {
        super(modelClass, diagramClass, actionType, diagramModel);
        this._model = model;
    }

    override applyRelation(): void {
      if (this._actionType == ActionType.ADD) {
        this._diagramModel.addClasses(this._getEfferentUseClasses());
        this._diagramModel.getClasses().forEach(
          (_class: Class) => {
            this._diagramModel.addEfferentHierarchyOf(_class);
          }
        );
      } else {
        this._diagramModel.removeUsesOf(this._diagramClass)
      }
    }

    private _getEfferentUseClasses(): Class[] {
      let _useClasses: Class[] = [];
      this._modelClass.getUses().forEach(
        (use: Use) => {
          let _copyUse: Use = new Use();
          use.classes.forEach(
            (_class: Class) => {
              let _copyClass: Class = new Class(_class.name);
              _copyClass.copy(_class);
              _copyUse.addClass(_copyClass);
              _useClasses.push(_copyClass);
            });
            this._diagramClass.addUse(_copyUse);
        });
      return _useClasses;
     }
}
