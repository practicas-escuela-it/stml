import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";

export abstract class Metric {
    protected _model: Model;

    constructor(model: Model) {
        this._model = model;        
    }

    abstract calculate(): void;
    abstract getValueOf(name: string): number;
}