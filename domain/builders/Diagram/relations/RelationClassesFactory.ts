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

export class RelationClassesFactory {

    private _direction: Direction;
    private _relation: RelationType;
    private _class: Class;
    private _model: Model;
    private _filteredClass: Class;

    constructor(direction: Direction, relation: RelationType, _class: Class, model: Model, filteredClass: Class) {
       this._direction = direction;
       this._relation = relation;
       this._class = _class;
       this._model = model;
       this._filteredClass = filteredClass;
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
          case RelationType.COMPOSITION:  return new AfferentCompositionRelation(this._class, this._model, this._filteredClass);
          case RelationType.ASSOCIATION: return new AfferentAssociationRelation(this._class, this._model, this._filteredClass);
          case RelationType.USE: return new AfferentUseRelation(this._class, this._model, this._filteredClass);
          case RelationType.INHERIT: return new AfferentInheritRelation(this._class, this._model, this._filteredClass);
       }
    }

    private getEfferentRelation(): Relation {
        switch (this._relation) {
            case RelationType.COMPOSITION:  return new EfferentCompositionRelation(this._class, this._filteredClass);
            case RelationType.ASSOCIATION: return new EfferentAssociationRelation(this._class, this._filteredClass);
            case RelationType.USE: return new EfferentUseRelation(this._class, this._filteredClass);
            case RelationType.INHERIT: return new EfferentInheritRelation(this._class, this._filteredClass);
         }
    }
}