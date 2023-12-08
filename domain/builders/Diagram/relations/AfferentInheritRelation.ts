import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { Relation } from "./Relation"
import { ActionType } from '../ActionType';

export class AfferentInheritRelation extends Relation {
    private _model: Model;

    constructor(_modelClass: Class, model: Model, diagramClass: Class, actionType: ActionType) {
        super(_modelClass, diagramClass, actionType);
        this._model = model;
    }

    getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                if (_class.name != this._modelClass.name && _class.hasInheritRelationWith(this._modelClass)) {
                    _classes.push(_class);
                }
            }
        );
        return _classes;
    }

}