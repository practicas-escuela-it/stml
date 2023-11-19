import { Association } from "../../../entities/Asociation";
import { Class } from "../../../entities/Class";
import { Identifier } from "../../../entities/Identifier";
import { Model } from "../../../entities/Model";
import { ClassElementFilter } from "./ClassElementFilter";
import { ClassFilterActionType } from "./ClassFilterOptionType";

export class AfferentAssociationFilter extends ClassElementFilter {
    
    private _model: Model;    

    constructor(_class: Class, model: Model) {
      super(_class);
      this._model = model;      
    }

    getFilteredElements(): Class[] {
        let _filteredClasses: Class[] = [];
        this._model.getClasses().forEach(
            (_class: Class) => {      
              if (_class.name != this._class.name) {        
                _class.getAssociations().forEach(
                (_association: Association) => {
                   _filteredClasses.push(...this.findAfferentClass(_association.identifiers, _class));                   
                }
               )
            }
            }
        );
        return _filteredClasses;
    }
    
}