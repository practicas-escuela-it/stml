import { Class } from "../../../entities/Class";
import { Use } from "../../../entities/Use";
import { RelationClass } from "./RelationClass";

export class EfferentUseRelation extends RelationClass {
    
    constructor(_class: Class) {
        super(_class);
     }
 
     getRelationClasses(): Class[] {
        let _classes: Class[] = [];
         this._class.getUses().forEach(
            (use: Use) => {               
               use.classes.forEach(
                 (_class: Class) => {                    
                    _classes.push(_class);     
                 });      
               this._filteredClass.addUse(use);         
           });                                
         return [this._filteredClass, ..._classes];
     }  
}