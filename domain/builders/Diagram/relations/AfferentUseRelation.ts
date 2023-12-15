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
        return this._getAfferentClassesTo(this._modelClass);
    }

    private _getAfferentClassesTo(_settedClass: Class): Class[] {
        let _classes: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {
                if (_class.name != _settedClass.name && _class.hasUseRelationWith(_settedClass)) {
                    _classes.push(_class);
                    _classes.push(...this._getAfferentClassesTo(_class));
                }
            }
        );
        return _classes;
    }

}