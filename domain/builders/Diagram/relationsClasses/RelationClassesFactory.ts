import { Relation } from "../Relation";
import { RelationClass } from "./RelationClass";
import { Direction } from "../classFilters/Direction";
import { AfferentCompositionRelation } from "./AfferentCompositionRelation";
import { AfferentAssociationRelation } from "./AfferentAssociationRelation";
import { AfferentUseRelation } from "./AfferentUseRelation";
import { EfferentCompositionRelation } from "./EfferentCompositionRelation";
import { EfferentAssociationRelation } from "./EfferentAssociationRelation";
import { EfferentUseRelation } from "./EfferentUseRelation";
import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";

export class RelationClassesFactory {

    private _direction: Direction;
    private _relation: Relation;
    private _class: Class;
    private _model: Model;

    constructor(direction: Direction, relation: Relation, _class: Class, model: Model) {
       this._direction = direction;
       this._relation = relation;
       this._class = _class;
       this._model = model;
    }

    instance(): RelationClass {
        if (this._direction == Direction.AFFERENT) {
            return this.getAfferentRelation();
        } else {
            return this.getEfferentRelation();
        }
    }

    private getAfferentRelation(): RelationClass {
       switch (this._relation) {
          case Relation.COMPOSITION:  return new AfferentCompositionRelation(this._class, this._model);
          case Relation.ASSOCIATION: return new AfferentAssociationRelation(this._class, this._model);
          case Relation.USE: return new AfferentUseRelation(this._class, this._model);
       }
    }

    private getEfferentRelation(): RelationClass {
        switch (this._relation) {
            case Relation.COMPOSITION:  return new EfferentCompositionRelation(this._class);
            case Relation.ASSOCIATION: return new EfferentAssociationRelation(this._class);
            case Relation.USE: return new EfferentUseRelation(this._class);
         }
    }
}