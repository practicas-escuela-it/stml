import { Class } from "../../../entities/Class";
import { Composition } from "../../../entities/Composition";
import { Model } from "../../../entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "./Relation";

export class EfferentCompositionRelation extends Relation {
   
   private _model: Model;

   constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model) {
      super(modelClass, diagramClass, actionType);
      this._model = model;
   }

   override getRelationClasses(): Class[] {
      let _compositionClasses: Class[] = [];
      this._modelClass.getCompositions().forEach(
         (composition: Composition) => {
            let _copyComposition: Composition = new Composition();                
            composition.getClasses().forEach(
               (_class: Class) => {
                  let _copyClass = new Class(_class.name);
                  _copyClass.copy(_class);                                  
                  _copyComposition.addClass(_copyClass);
                  _compositionClasses.push(_copyClass);  
                  _compositionClasses.push(...this._model.getEfferentCompositionsOf(_class))
               });                    
           this.updateDiagram(_copyComposition);
         });
      return _compositionClasses;
   }   

   private updateDiagram(_composition: Composition) {
      if (this._actionType == ActionType.ADD) {
         this._diagramClass.addComposition(_composition);
      } else {             
         this._diagramClass.removeComposition(_composition);
      }
   }
}