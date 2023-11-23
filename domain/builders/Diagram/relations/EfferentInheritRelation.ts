import { Class } from "../../../entities/Class";
import { Model } from "../../../entities/Model";
import { Relation } from "./Relation";

export class EfferentInheritRelation extends Relation {

    constructor(_class: Class, _filteredClass: Class) {
        super(_class, _filteredClass);
        
    }

    override getRelationClasses(): Class[] {
        let _classes: Class[] = [];
        this._class.getInherits().forEach(
            (inherit: Class) => {               
                _classes.push(inherit);
                this._filteredClass.addInherit(inherit);                
            });
        return [this._filteredClass, ..._classes];
    }

}