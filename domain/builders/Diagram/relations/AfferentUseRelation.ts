import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class AfferentUseRelation extends Relation {

    private _model: Model;

    constructor(modelClass: Class, model: Model, diagramClass: Class, actionType: ActionType) {
        super(modelClass, diagramClass, actionType);
        this._model = model;
    }

    getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                if (_class.hasUseRelationWith(this._modelClass)) {
                    _classes.push(_class);
                }
            }
        );
        return _classes;
    }

}