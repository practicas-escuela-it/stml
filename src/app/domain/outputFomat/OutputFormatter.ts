import { Model } from "../entities/Model";

export abstract class OutputFormatter {

    protected _model: Model;

    constructor(model: Model) {
       this._model = model;
    }

    abstract format(): string;        
}