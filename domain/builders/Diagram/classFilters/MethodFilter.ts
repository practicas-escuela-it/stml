import { Class } from "../../../entities/Class";
import { Method } from "../../../entities/Method";
import { Parameter } from "../../../entities/Parameter";
import { ClassElementFilter } from "./ClassElementFilter";

export class MethodFilter extends ClassElementFilter {

    constructor(_class: Class) {
        super(_class)
    }

    getFilteredElements(): Class[] {      
        let _filteredClass: Class = new Class(this._class.name);  
        this._class.getMethods().forEach(
          (_method: Method) => {
            let _methodCopy: Method = new Method();
            _methodCopy.setIdentifier(_method.identifier.value);
            _method.parameters.forEach(
                (parameter: Parameter) => {                    
                    _methodCopy.addParameter(parameter.identifier.value, parameter.type.value);
                }
            );            
            _filteredClass.addMethod(_methodCopy);
          }
        );        
        return [_filteredClass];
    }
    
}