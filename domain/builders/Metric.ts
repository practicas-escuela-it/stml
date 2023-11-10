import { Class } from "../entities/Class";
import { Model } from "../entities/Model";

export abstract class Metric {
    protected _model: Model;

    constructor(model: Model) {
        this._model = model;        
    }

    protected abstract calculate(model: Model): void;
    abstract getValueOf(_className: string): number;
}