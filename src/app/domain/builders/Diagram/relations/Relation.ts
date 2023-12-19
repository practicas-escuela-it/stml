import { Model } from "src/app/domain/entities/Model";
import { Class } from "../../../entities/Class";
import { ActionType } from "../ActionType";

export abstract class Relation {

    protected _modelClass: Class;
    protected _diagramClass: Class;
    protected _actionType: ActionType;
    protected _diagramModel: Model;

    constructor(_class: Class, _diagramClass: Class, _actionType: ActionType, _diagramModel: Model) {
       this._modelClass = _class;
       this._diagramClass = _diagramClass;
       this._actionType = _actionType;
       this._diagramModel = _diagramModel;
    }

    abstract applyRelation(): void;
}
