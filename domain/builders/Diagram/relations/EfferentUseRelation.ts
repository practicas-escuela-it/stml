import { Class } from "../../../entities/Class";
import { Use } from "../../../entities/Use";
import { Relation } from "./Relation";
import { ActionType } from '../ActionType';

export class EfferentUseRelation extends Relation {
    
    constructor(_class: Class, filteredClass: Class, actionType: ActionType) {
        super(_class, filteredClass, actionType);
     }
 
     getRelationClasses(): Class[] {
        let _classes: Class[] = [];
         this._modelClass.getUses().forEach(
            (use: Use) => {               
               let _copyUse: Use = new Use();
               use.classes.forEach(
                 (_class: Class) => {             
                    let _copyClass: Class = new Class(_class.name);       
                    _classes.push(_copyClass);   
                    _copyUse.addClass(_copyClass);  
                 });      
              this.updateDiagram(_copyUse);        
           });                                
         return _classes;
     }  

     private updateDiagram(_use: Use) {
      if (this._actionType == ActionType.ADD) {
         this._diagramClass.addUse(_use);
      } else {             
         this._diagramClass.removeUse(_use);
      }
   }
}