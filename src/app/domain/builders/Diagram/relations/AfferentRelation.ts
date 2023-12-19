import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { AfferentAssociationRelation } from "./AfferentAssociationRelation";
import { AfferentCompositionRelation } from "./AfferentCompositionRelation";
import { AfferentInheritRelation } from "./AfferentInheritRelation";
import { AfferentUseRelation } from "./AfferentUseRelation";
import { Relation } from "./Relation";

export class AfferentRelation extends Relation {
    private _model: Model;

    constructor(modelClass: Class, model: Model, diagramClass: Class, _actionType: ActionType) {
        super(modelClass, diagramClass, _actionType);
        this._model = model;
    }

    applyRelation(): Class[] {
        return [
            ...new AfferentAssociationRelation(this._modelClass, this._model, this._diagramClass, this._actionType).applyRelation(),
            ...new AfferentCompositionRelation(this._modelClass, this._model, this._diagramClass, this._actionType).applyRelation(),
            ...new AfferentUseRelation(this._modelClass, this._model, this._diagramClass, this._actionType).applyRelation(),
            ...new AfferentInheritRelation(this._modelClass, this._model, this._diagramClass, this._actionType).applyRelation()
        ];
    }
}
