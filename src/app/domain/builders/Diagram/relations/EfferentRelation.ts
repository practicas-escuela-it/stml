import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { EfferentAssociationRelation } from "./EfferentAssociationRelation";
import { EfferentCompositionRelation } from "./EfferentCompositionRelation";
import { EfferentInheritRelation } from "./EfferentInheritRelation";
import { EfferentUseRelation } from "./EfferentUseRelation";
import { Relation } from "./Relation";

export class EfferentRelation extends Relation {   

    private _model: Model;

   constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model) {
      super(modelClass, diagramClass, actionType);
      this._model = model;
   }

    getRelationClasses(): Class[] {
        let _relatedClasses: Class[] = [];
        _relatedClasses.push(...new EfferentAssociationRelation(this._modelClass, this._diagramClass, this._actionType, this._model).getRelationClasses());
        _relatedClasses.push(...new EfferentCompositionRelation(this._modelClass, this._diagramClass, this._actionType, this._model).getRelationClasses());
        _relatedClasses.push(...new EfferentUseRelation(this._modelClass, this._diagramClass, this._actionType, this._model).getRelationClasses());
        _relatedClasses.push(...new EfferentInheritRelation(this._modelClass, this._diagramClass, this._actionType, this._model).getRelationClasses());
        return _relatedClasses;
    }
}