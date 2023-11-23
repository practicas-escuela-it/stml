import { Class } from "../../../entities/Class";

export abstract class ElementFilter {
    protected _originalClass: Class;
    protected _filteredClass: Class;
    protected _names: string[];

    constructor(names: string[], originalClass: Class, filteredClass: Class) {
        this._names = names;
        this._originalClass = originalClass;
        this._filteredClass = filteredClass;
    }

    abstract filter(): void;
    protected abstract _addAll(): void;
    protected abstract _add(names: string[]): void;
}