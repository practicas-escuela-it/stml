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

 constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model, diagramModel: Model) {
    super(modelClass, diagramClass, actionType, diagramModel);
    this._model = model;
 }

  override applyRelation(): void {
      this._applyEfferentRelationClases();
      this._applyAfferentRelationClasses();
  }

  private _applyEfferentRelationClases(): void {
      new EfferentAssociationRelation(this._modelClass, this._diagramClass, this._actionType, this._model, this._diagramModel).applyRelation();
      new EfferentCompositionRelation(this._modelClass, this._diagramClass, this._actionType, this._model, this._diagramModel).applyRelation();
      new EfferentUseRelation(this._modelClass, this._diagramClass, this._actionType, this._model, this._diagramModel).applyRelation();
      new EfferentInheritRelation(this._modelClass, this._diagramClass, this._actionType, this._model, this._diagramModel).applyRelation();
  }

  private _applyAfferentRelationClasses(): void {
      new AfferentAssociationRelation(this._modelClass, this._model, this._diagramClass, this._actionType, this._diagramModel).applyRelation();
      new AfferentCompositionRelation(this._modelClass, this._model, this._diagramClass, this._actionType, this._diagramModel).applyRelation();
      new AfferentUseRelation(this._modelClass, this._model, this._diagramClass, this._actionType, this._diagramModel).applyRelation();
      new AfferentInheritRelation(this._modelClass, this._model, this._diagramClass, this._actionType, this._diagramModel).applyRelation();
  }
}
