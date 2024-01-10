import { Model } from "src/app/domain/entities/Model";
import { Relation } from "./Relation";
import { Class } from "src/app/domain/entities/Class";
import { ActionType } from "../ActionType";
import { EfferentRelation } from "./EfferentRelation";
import { AfferentRelation } from "./AfferentRelation";

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
      new EfferentRelation(this._modelClass, this._diagramClass, this._actionType, this._model, this._diagramModel).applyRelation();
  }

  private _applyAfferentRelationClasses(): void {
      new AfferentRelation(this._modelClass, this._model, this._diagramClass, this._actionType, this._diagramModel).applyRelation();
  }
}
