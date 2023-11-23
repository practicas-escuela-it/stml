import { Association } from "../../../entities/Asociation";
import { Class } from "../../../entities/Class";
import { Relation } from "./Relation";

export class EfferentAssociationRelation extends Relation {

    constructor(_class: Class, filteredClass: Class) {
        super(_class, filteredClass);
    }

    override getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._class.getAssociations().forEach(
            (association: Association) => {
                association.classes.forEach(
                    (_class: Class) => {
                        _classes.push(_class);
                    });
                 this._filteredClass.addAsociation(association);
            });
        return [this._filteredClass, ..._classes];
    }

}