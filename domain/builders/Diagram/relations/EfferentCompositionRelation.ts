import { Class } from "../../../entities/Class";
import { Composition } from "../../../entities/Composition";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class EfferentCompositionRelation extends Relation {

   constructor(_modelClass: Class, _diagramClass: Class, _actionType: ActionType) {
      super(_modelClass, _diagramClass, _actionType);
   }

   override getRelationClasses(): Class[] {
      let _classes: Class[] = [];
      this._modelClass.getCompositions().forEach(
         (composition: Composition) => {
            let _copyComposition: Composition = new Composition();                
            composition.getClasses().forEach(
               (_class: Class) => {
                  let _copyClass = new Class(_class.name);
                  _copyClass.copy(_class);
                  _classes.push(_copyClass);                  
                  _copyComposition.addClass(_copyClass);
               });                    
           this.execOperation(_copyComposition);
         });
      return _classes;
   }   

   private execOperation(_composition: Composition) {
      if (this._actionType == ActionType.ADD) {
         this._diagramClass.addComposition(_composition);
      } else {             
         this._diagramClass.removeComposition(_composition);
      }
   }
}