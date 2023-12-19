import { Association } from "../../../entities/Asociation";
import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class EfferentAssociationRelation extends Relation {

  private _model: Model;

  constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model) {
    super(modelClass, diagramClass, actionType);
    this._model = model;
  }

  override getRelationClasses(): Class[] {
    let _associationClasses: Class[] = [];
    if (this._actionType == ActionType.ADD) {
      _associationClasses = this._getEfferentClassesOf(this._modelClass);
      _associationClasses.forEach(
        (_class: Class) => {
          _associationClasses.push(..._class.getEfferentHierarchy());
        }
      );
    } else {
      this._diagramClass.removeAssociations();
    }
    return _associationClasses;
  }

  private _getEfferentClassesOf(_settedClass: Class): Class[] {
    let _associationClasses: Class[] = [];
    _settedClass.getAssociations().forEach(
      (association: Association) => {
        let _copyAssociation: Association = new Association();
        association.classes.forEach(
          (_class: Class) => {
            let _copyClass: Class = new Class(_class.name);
            _copyClass.copy(_class);
            _copyAssociation.addClass(_class);
            _associationClasses.push(_copyClass);
          });
          this._diagramClass.addAsociation(_copyAssociation);
      });
    return _associationClasses;
  }

}
