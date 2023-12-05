import { Class } from "../../../entities/Class";
import { Use } from "../../../entities/Use";
import { Relation } from "./Relation";

export class EfferentUseRelation extends Relation {
    
    constructor(_class: Class, filteredClass: Class) {
        super(_class, filteredClass);
     }
 
     getRelationClasses(): Class[] {
        let _classes: Class[] = [];
         this._modelClass.getUses().forEach(
            (use: Use) => {               
               use.classes.forEach(
                 (_class: Class) => {                    
                    _classes.push(_class);     
                 });      
               this._diagramClass.addUse(use);         
           });                                
         return [this._diagramClass, ..._classes];
     }  
}