import { Association } from "../../../entities/Asociation";
import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class EfferentAssociationRelation extends Relation {

    private _model: Model;

    constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model) {
        super(modelClass, diagramClass, actionType);
        this._model = model;
    }

    override getRelationClasses(): Class[] {
        let _associationClasses: Class[] = [];
        this._modelClass.getAssociations().forEach(
            (association: Association) => {
                let _copyAssociation: Association = new Association();
                association.classes.forEach(
                (_class: Class) => {
                   let _copyClass: Class = new Class(_class.name);
                   _copyClass.copy(_class);                   
                   _copyAssociation.addClass(_class);
                   _associationClasses.push(_copyClass);                   
                   _associationClasses.push(...this._model.getEfferentAssociationsOf(_class));                   
                });
                this.updateDiagram(_copyAssociation);
            });
        return _associationClasses;
    }
    
    private updateDiagram(_association: Association) {
        if (this._actionType == ActionType.ADD) {
            this._diagramClass.addAsociation(_association);
        } else {
            this._diagramClass.removeAssociation(_association);
        }
    }
}