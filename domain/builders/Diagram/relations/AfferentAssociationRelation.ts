import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class AfferentAssociationRelation extends Relation {

    private _model: Model;

    constructor(modelClass: Class, model: Model, diagramClass: Class, _actionType: ActionType) {
        super(modelClass, diagramClass, _actionType);
        this._model = model;
    }

    getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                if (_class.name != this._modelClass.name && _class.hasAssociationRelationWith(this._modelClass)) {
                    console.log("Class afferente " + _class.name)
                    _classes.push(_class);
                }
            }
        );
        return _classes;
    }
}