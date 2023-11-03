import { Model } from "../../domain/entities/Model";
import { OutputFormatter } from "../OutputFormatter";

export class JavaOutputFormatter implements OutputFormatter {

    private _model: Model;

    constructor(model: Model) {
       this._model = model;
    }

    format(): string {
        return "";
    }

}