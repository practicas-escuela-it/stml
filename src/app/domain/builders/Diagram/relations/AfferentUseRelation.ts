import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class AfferentUseRelation extends Relation {

  private _model: Model;

  constructor(modelClass: Class, model: Model, diagramClass: Class, actionType: ActionType, diagramModel: Model) {
    super(modelClass, diagramClass, actionType, diagramModel);
    this._model = model;
  }

  override applyRelation(): void {
    if (this._actionType == ActionType.ADD) {
      this._diagramModel.addClasses(this._getAfferentClassesTo(this._modelClass));
    } else {
      this._diagramModel.removeClasses(this._getAfferentClassesTo(this._modelClass));
    }
  }

  private _getAfferentClassesTo(_settedClass: Class): Class[] {
    let _classes: Class[] = [];
    this._model.getClasses().forEach(
      (_class: Class) => {
        if (_class.name != _settedClass.name && _class.hasUseRelationWith(_settedClass)) {
          let _copyClass: Class = new Class(_class.name);
          _copyClass.copy(_class);
          _classes.push(_copyClass);
          _classes.push(...this._model.getAfferentHierarchyTo(_copyClass));
        }
      }
    );
    return _classes;
  }

}
