import { Class } from "../../../entities/Class";

export abstract class ElementFilter {
    protected _modelClass: Class;
    protected _diagramClass: Class;
    protected _names: string[];

    constructor(names: string[], originalClass: Class, filteredClass: Class) {
        this._names = names;
        this._modelClass = originalClass;
        this._diagramClass = filteredClass;
    }

    abstract filter(): void;
    protected abstract _addAll(): void;
    protected abstract _add(names: string[]): void;
}