import { Association } from "../../../entities/Asociation";
import { Class } from "../../../entities/Class";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class EfferentAssociationRelation extends Relation {

    constructor(_class: Class, filteredClass: Class, _actionType: ActionType) {
        super(_class, filteredClass, _actionType);
    }

    override getRelationClasses(): Class[] {
        let _relatedClasses: Class[] = [];
        this._modelClass.getAssociations().forEach(
            (association: Association) => {
                let _copyAssociation: Association = new Association();
                association.classes.forEach(
                    (_class: Class) => {
                        let _copyClass: Class = new Class(_class.name);
                        _copyClass.copy(_class);
                        _relatedClasses.push(_copyClass);
                        _copyAssociation.addClass(_copyClass);
                    });
                 this.updateDiagram(_copyAssociation);
            });
        return _relatedClasses;
    }

    private updateDiagram(_association: Association) {
        if (this._actionType == ActionType.ADD) {
           this._diagramClass.addAsociation(_association);
        } else {             
           this._diagramClass.removeAssociation(_association);
        }
     }
}