import { Association } from "../../../entities/Asociation";
import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class EfferentAssociationRelation extends Relation {

  private _model: Model;

  constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model, diagramModel: Model) {
    super(modelClass, diagramClass, actionType, diagramModel);
    this._model = model;
  }

  override applyRelation(): void {
    if (this._actionType == ActionType.ADD) {
      this._diagramModel.addClasses(this._getEfferentClassesOf(this._modelClass));
      this._diagramModel.getClasses().forEach(
        (_class: Class) => {
          this._diagramModel.addEfferentHierarchyOf(_class);
          // this._diagramModel.addClasses(_class.getEfferentHierarchy());
        }
      );
    } else {
      this._diagramModel.removeAssociationsOf(this._diagramClass)
    }
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
            _copyAssociation.addClass(_copyClass);
            _associationClasses.push(_copyClass);
          });
          this._diagramClass.addAsociation(_copyAssociation);
      });
    return _associationClasses;
  }

}
