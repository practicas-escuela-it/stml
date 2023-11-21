import { Class } from "../../../entities/Class";
import { Composition } from "../../../entities/Composition";
import { RelationClass } from "./RelationClass";

export class EfferentCompositionRelation extends RelationClass {
    
    constructor(_class: Class) {
        super(_class);
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