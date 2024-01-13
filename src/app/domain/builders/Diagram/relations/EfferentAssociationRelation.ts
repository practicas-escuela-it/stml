import { Multiplicity } from "src/app/domain/entities/Multiplicity";
import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import * as EntityRelation from '../../../entities/Relation';
import { Relation } from "./Relation";

export class EfferentAssociationRelation extends Relation {

  private _model: Model;

  constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model, diagramModel: Model) {
    super(modelClass, diagramClass, actionType, diagramModel);
    this._model = model;
  }

  override applyRelation(): void {
    if (this._actionType == ActionType.ADD) {
      this._diagramModel.addClasses(this._getEfferentAssociationClasses());
      this._diagramModel.getClasses().forEach(
        (_class: Class) => {
          this._diagramModel.addEfferentHierarchyOf(_class);
        }
      );
    } else {
     this._diagramModel.removeAssociationsOf(this._diagramClass)
    }
  }

  private _getEfferentAssociationClasses(): Class[] {
    let _associationClasses: Class[] = [];
    this._diagramClass.removeAssociations();
    this._modelClass.getAssociations().forEach(
      (association: EntityRelation.Relation) => {
        let _copyAssociation: EntityRelation.Relation = new EntityRelation.Relation();
        association.getClasses().forEach(
          (_class: Class) => {
            let _copyClass: Class = new Class(_class.name);
            _copyClass.copy(_class);
            _copyAssociation.addClass(_copyClass);
            _associationClasses.push(_copyClass);
            this._copyMultiplicity(association, _copyAssociation, _class.name);
          });
          this._diagramClass.addAsociation(_copyAssociation);
      });
    return _associationClasses;
  }

  private _copyMultiplicity(association: EntityRelation.Relation, copyAssociation: EntityRelation.Relation, className: string) {
    if (association.hasMultiplicityWith(className)) {
      let _multiplicity: Multiplicity = new Multiplicity();
      _multiplicity.copy(association.getMultiplicityWith(className));
      copyAssociation.addMultiplicity(className, _multiplicity);
    }
  }
}
