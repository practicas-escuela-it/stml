import { Class } from "src/app/domain/entities/Class";
import { Model } from "src/app/domain/entities/Model";
import { ActionType } from "../ActionType";
import { Relation } from "../relations/Relation";

export class ClassFilter extends Relation {


  constructor(_classToRemove: Class, diagramClass: Class, diagramModel: Model, actionType: ActionType) {
    super(_classToRemove, diagramClass, actionType, diagramModel);
  }

  override applyRelation(): void {
      let _classToRemove: Class = this._modelClass;
      this._removeEfferentRelationsOf(_classToRemove);
      this._removeAfferentRelationsTorward(_classToRemove);
      this._diagramModel.removeClass(_classToRemove);
    }

    private _removeEfferentRelationsOf(_classToRemove: Class): void {
      this._diagramModel.removeAssociationsOf(_classToRemove);
      this._diagramModel.removeCompositionsOf(_classToRemove);
      this._diagramModel.removeUsesOf(_classToRemove);
      this._diagramModel.removeInheritsOf(_classToRemove);
    }

    private _removeAfferentRelationsTorward(_classToRemove: Class): void {
      this._diagramModel.getClasses().forEach(
        (_class: Class) => {
          if (_class.name != _classToRemove.name) {
              _class.removeEfferentClass(_classToRemove);

          }
        }
      );
    }
}
