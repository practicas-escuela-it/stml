import { Association } from "../../../entities/Asociation";
import { Class } from "../../../entities/Class";
import { RelationClass } from "./RelationClass";

export class EfferentAssociationRelation extends RelationClass {

    constructor(_class: Class) {
        super(_class);
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