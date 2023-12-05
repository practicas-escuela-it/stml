import { Association } from "../../../entities/Asociation";
import { Class } from "../../../entities/Class";
import { Relation } from "./Relation";

export class EfferentAssociationRelation extends Relation {

    constructor(_class: Class, filteredClass: Class) {
        super(_class, filteredClass);
    }

    override getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._modelClass.getAssociations().forEach(
            (association: Association) => {
                association.classes.forEach(
                    (_class: Class) => {
                        _classes.push(_class);
                    });
                 this._diagramClass.addAsociation(association);
            });
        return [this._diagramClass, ..._classes];
    }

}