import { Class } from "../../../entities/Class";
import { Composition } from "../../../entities/Composition";
import { Relation } from "./Relation";

export class EfferentCompositionRelation extends Relation {
    
    constructor(_class: Class, filteredClass: Class) {
        super(_class, filteredClass);
     }
 
     override getRelationClasses(): Class[] {
         let _classes: Class[] = [];
         this._class.getCompositions().forEach(
            (composition: Composition) => {               
               composition.getClasses().forEach(
                 (_class: Class) => {                    
                    _classes.push(_class);     
                 });               
                this._filteredClass.addComposition(composition);
           });                                
         return [this._filteredClass, ..._classes];
     }  
}