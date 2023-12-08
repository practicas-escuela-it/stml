import { Class } from "../../../entities/Class";
import { Composition } from "../../../entities/Composition";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class AfferentCompositionRelation extends Relation {

    private _model: Model;

    constructor(_modelClass: Class, model: Model, diagramClass: Class, actionType: ActionType) {
        super(_modelClass, diagramClass, actionType);
        this._model = model;
    }

    getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                if (_class.hasCompositionRelationWith(this._modelClass)) {
                    _classes.push(_class);
                }
            }
        );
        return _classes;
    }
}