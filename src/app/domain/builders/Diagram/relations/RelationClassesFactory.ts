import { Direction } from "../types/Direction";
import { AfferentCompositionRelation } from "./AfferentCompositionRelation";
import { AfferentAssociationRelation } from "./AfferentAssociationRelation";
import { AfferentUseRelation } from "./AfferentUseRelation";
import { EfferentCompositionRelation } from "./EfferentCompositionRelation";
import { EfferentAssociationRelation } from "./EfferentAssociationRelation";
import { EfferentUseRelation } from "./EfferentUseRelation";
import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { EfferentInheritRelation } from "./EfferentInheritRelation";
import { AfferentInheritRelation } from "./AfferentInheritRelation";
import { Relation } from "./Relation";
import { RelationType } from "../types/RelationType";
import { ActionType } from "../ActionType";
import { EfferentRelation } from "./EfferentRelation";
import { AfferentRelation } from "./AfferentRelation";
import { Axis } from "./Axis";
import { FullRelation } from "./FullRelation";

export class RelationClassesFactory {

    private _axis: Axis;
    private _modelClass: Class;
    private _model: Model;
    private _diagramClass: Class;
    private _actionType: ActionType;

    constructor(axis: Axis, _modelClass: Class, model: Model, diagramClass: Class, _actionType: ActionType) {
      this._axis = axis;
      this._modelClass = _modelClass;
      this._model = model;
      this._diagramClass = diagramClass;
      this._actionType = _actionType;
    }

    instance(): Relation {
        if (this._axis.direction == Direction.AFFERENT) {
            return this.getAfferentRelation();
        } else if (this._axis.direction == Direction.EFFERENT) {
            return this.getEfferentRelation();
        } else {
          return this.getAllRelation();
        }
    }

    private getAfferentRelation(): Relation {
       switch (this._axis.relationType) {
          case RelationType.COMPOSITION:  return new AfferentCompositionRelation(this._modelClass, this._model, this._diagramClass, this._actionType);
          case RelationType.ASSOCIATION: return new AfferentAssociationRelation(this._modelClass, this._model, this._diagramClass, this._actionType);
          case RelationType.USE: return new AfferentUseRelation(this._modelClass, this._model, this._diagramClass, this._actionType);
          case RelationType.INHERIT: return new AfferentInheritRelation(this._modelClass, this._model, this._diagramClass, this._actionType);
          case RelationType.ALL: return new AfferentRelation(this._modelClass, this._model, this._diagramClass, this._actionType);
       }
    }

    private getEfferentRelation(): Relation {
        switch (this._axis.relationType) {
            case RelationType.COMPOSITION:  return new EfferentCompositionRelation(this._modelClass, this._diagramClass, this._actionType, this._model);
            case RelationType.ASSOCIATION: return new EfferentAssociationRelation(this._modelClass, this._diagramClass, this._actionType, this._model);
            case RelationType.USE: return new EfferentUseRelation(this._modelClass, this._diagramClass, this._actionType, this._model);
            case RelationType.INHERIT: return new EfferentInheritRelation(this._modelClass, this._diagramClass, this._actionType, this._model);
            case RelationType.ALL: return new EfferentRelation(this._modelClass, this._diagramClass, this._actionType, this._model);
         }
    }

    getAllRelation(): Relation {
      return new FullRelation(this._modelClass, this._diagramClass, this._actionType, this._model);
    }
}
