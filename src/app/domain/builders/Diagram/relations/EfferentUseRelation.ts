import { Class } from "../../../entities/Class";
import { Use } from "../../../entities/Use";
import { Relation } from "./Relation";
import { ActionType } from '../ActionType';
import { Model } from "../../../entities/Model";

export class EfferentUseRelation extends Relation {

   private _model: Model;

    constructor(modelClass: Class, diagramClass: Class, actionType: ActionType, model: Model) {
        super(modelClass, diagramClass, actionType);
        this._model = model;
    }

    override getRelationClasses(): Class[] {
      let _useClasses: Class[] = [];
      _useClasses = this._getModelEfferentClasses();
      _useClasses.forEach(
        (_class: Class) => {
           _useClasses.push(..._class.getEfferentHierarchy());
        }
      )
      return _useClasses;
    }

    private _getModelEfferentClasses(): Class[] {
        let _classes: Class[] = [];
         this._modelClass.getUses().forEach(
            (use: Use) => {
               let _copyUse: Use = new Use();
               use.classes.forEach(
                 (_class: Class) => {
                    let _copyClass: Class = new Class(_class.name);
                    _copyClass.copy(_class);
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
