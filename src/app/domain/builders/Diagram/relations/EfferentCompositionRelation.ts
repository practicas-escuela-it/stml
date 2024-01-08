import { Multiplicity } from "src/app/domain/entities/Multiplicity";
import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";
import * as EntityRelation from "../../../entities/Relation";

export class EfferentCompositionRelation extends Relation {

  private _model: Model;

  constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model, diagramModel: Model) {
    super(modelClass, diagramClass, actionType, diagramModel);
    this._model = model;
  }

  override applyRelation(): void {
    if (this._actionType == ActionType.ADD) {
      this._diagramModel.addClasses(this._getCompositionEfferentClasses());
      this._diagramModel.getClasses().forEach(
        (_class: Class) => {
          this._diagramModel.addEfferentHierarchyOf(_class);
        }
      )
    } else {
       this._diagramModel.removeCompositionsOf(this._diagramClass);
    }
  }

  private _getCompositionEfferentClasses(): Class[] {
    let _compositionClasses: Class[] = [];
    this._diagramClass.removeCompositions();
    this._modelClass.getCompositions().forEach(
      (composition: EntityRelation.Relation) => {
        let _copyComposition: EntityRelation.Relation = new EntityRelation.Relation();
        composition.getClasses().forEach(
          (_class: Class) => {
            let _copyClass = new Class(_class.name);
            _copyClass.copy(_class);
            _copyComposition.addClass(_copyClass);
            _compositionClasses.push(_copyClass);
            this._copyMultiplicity(composition, _copyComposition, _class.name);
          });
        this._diagramClass.addComposition(_copyComposition);
      });
    return _compositionClasses;
  }

  private _copyMultiplicity(composition: EntityRelation.Relation, copyComposition: EntityRelation.Relation, className: string) {
    if (composition.hasMultiplicityWith(className)) {
      let _multiplicity: Multiplicity = new Multiplicity();
      _multiplicity.copy(composition.getMultiplicityWith(className));
      copyComposition.addMultiplicity(className, _multiplicity);
    }
  }
}
