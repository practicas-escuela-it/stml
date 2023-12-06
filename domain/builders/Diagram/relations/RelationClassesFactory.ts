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

export class RelationClassesFactory {

    private _direction: Direction;
    private _relation: RelationType;
    private _modelClass: Class;
    private _model: Model;
    private _diagramClass: Class;
    private _actionType: ActionType;
    
    constructor(direction: Direction, relation: RelationType, _modelClass: Class, model: Model, diagramClass: Class, _actionType: ActionType) {
       this._direction = direction;
       this._relation = relation;
       this._modelClass = _modelClass;
       this._model = model;
       this._diagramClass = diagramClass;       
       this._actionType = _actionType;
    }

    instance(): Relation {
        if (this._direction == Direction.AFFERENT) {
            return this.getAfferentRelation();
        } else {
            return this.getEfferentRelation();
        }
    }

    private getAfferentRelation(): Relation {
       switch (this._relation) {
          case RelationType.COMPOSITION:  return new AfferentCompositionRelation(this._modelClass, this._model, this._diagramClass);
          case RelationType.ASSOCIATION: return new AfferentAssociationRelation(this._modelClass, this._model, this._diagramClass);
          case RelationType.USE: return new AfferentUseRelation(this._modelClass, this._model, this._diagramClass);
          case RelationType.INHERIT: return new AfferentInheritRelation(this._modelClass, this._model, this._diagramClass);
       }
    }

    private getEfferentRelation(): Relation {
        switch (this._relation) {
            case RelationType.COMPOSITION:  return new EfferentCompositionRelation(this._modelClass, this._diagramClass, this._actionType);
            case RelationType.ASSOCIATION: return new EfferentAssociationRelation(this._modelClass, this._diagramClass, this._actionType);
            case RelationType.USE: return new EfferentUseRelation(this._modelClass, this._diagramClass, this._actionType);
            case RelationType.INHERIT: return new EfferentInheritRelation(this._modelClass, this._diagramClass);
         }
    }
}