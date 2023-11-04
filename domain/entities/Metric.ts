import { Class } from "./Class";
import { Model } from "./Model";

export abstract class Metric {
    protected _model: Model;

    constructor(model: Model) {
        this._model = model;
    }

    abstract calculate(): void;
    abstract getValueOf(_className: string): number;
}