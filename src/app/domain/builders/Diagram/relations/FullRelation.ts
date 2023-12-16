import { Model } from "src/app/domain/entities/Model";
import { Relation } from "./Relation";
import { Class } from "src/app/domain/entities/Class";
import { ActionType } from "../ActionType";
import { EfferentAssociationRelation } from "./EfferentAssociationRelation";
import { EfferentCompositionRelation } from "./EfferentCompositionRelation";
import { EfferentUseRelation } from "./EfferentUseRelation";
import { EfferentInheritRelation } from "./EfferentInheritRelation";
import { AfferentAssociationRelation } from "./AfferentAssociationRelation";
import { AfferentCompositionRelation } from "./AfferentCompositionRelation";
import { AfferentUseRelation } from "./AfferentUseRelation";
import { AfferentInheritRelation } from "./AfferentInheritRelation";

export class FullRelation extends Relation {

  private _model: Model;

 constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model) {
    super(modelClass, diagramClass, actionType);
    this._model = model;
 }

  getRelationClasses(): Class[] {
      let _relatedClasses: Class[] = [
        ...this._getEfferentRelationClases(),
        ...this._getAfferentRelationClasses()
      ];
      return _relatedClasses;
  }

  private _getEfferentRelationClases(): Class[] {
    let _relatedClasses: Class[] = [];
      _relatedClasses.push(...new EfferentAssociationRelation(this._modelClass, this._diagramClass, this._actionType, this._model).getRelationClasses());
      _relatedClasses.push(...new EfferentCompositionRelation(this._modelClass, this._diagramClass, this._actionType, this._model).getRelationClasses());
      _relatedClasses.push(...new EfferentUseRelation(this._modelClass, this._diagramClass, this._actionType, this._model).getRelationClasses());
      _relatedClasses.push(...new EfferentInheritRelation(this._modelClass, this._diagramClass, this._actionType, this._model).getRelationClasses());
      return _relatedClasses;
  }

  private _getAfferentRelationClasses(): Class[] {
    return [
      ...new AfferentAssociationRelation(this._modelClass, this._model, this._diagramClass, this._actionType).getRelationClasses(),
      ...new AfferentCompositionRelation(this._modelClass, this._model, this._diagramClass, this._actionType).getRelationClasses(),
      ...new AfferentUseRelation(this._modelClass, this._model, this._diagramClass, this._actionType).getRelationClasses(),
      ...new AfferentInheritRelation(this._modelClass, this._model, this._diagramClass, this._actionType).getRelationClasses()
  ];
  }
}
