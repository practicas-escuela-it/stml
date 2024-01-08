import { Class } from "../../../entities/Class";
import { Relation } from "./Relation";
import * as EntityRelation from "../../../entities/Relation";
import { ActionType } from '../ActionType';
import { Model } from "../../../entities/Model";
import { Multiplicity } from "src/app/domain/entities/Multiplicity";

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
      this._diagramClass.removeUses();
      this._modelClass.getUses().forEach(
        (use: EntityRelation.Relation) => {
          let _copyUse: EntityRelation.Relation = new EntityRelation.Relation();
          use.getClasses().forEach(
            (_class: Class) => {
              let _copyClass: Class = new Class(_class.name);
              _copyClass.copy(_class);
              _copyUse.addClass(_copyClass);
              _useClasses.push(_copyClass);
              this._copyMultiplicity(use, _copyUse, _class.name);
            });
            this._diagramClass.addUse(_copyUse);
        });
      return _useClasses;
     }

     private _copyMultiplicity(use: EntityRelation.Relation, copyUse: EntityRelation.Relation, className: string) {
      if (use.hasMultiplicityWith(className)) {
        let _multiplicity: Multiplicity = new Multiplicity();
        _multiplicity.copy(use.getMultiplicityWith(className));
        copyUse.addMultiplicity(className, _multiplicity);
      }
    }
}
