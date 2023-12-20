import { Class } from "../../../entities/Class";
import { ActionType } from "../ActionType";

export abstract class ElementFilter {
    protected _modelClass: Class;
    protected _diagramClass: Class;
    protected _names: string[];
    protected _actionType: ActionType;

    constructor(names: string[], modelClass: Class, diagramClass: Class, actionType: ActionType) {
        this._names = names;
        this._modelClass = modelClass;
        this._diagramClass = diagramClass;
        this._actionType = actionType;
    }

    abstract filter(): void;
    protected abstract _addAll(): void;
    protected abstract _add(names: string[]): void;
    protected abstract _removeAll(): void;
    protected abstract _remove(names: string[]): void;
}
