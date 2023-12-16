import { Class } from "./Class";

export class Association {
   
    private _classes: Class[];

    constructor() {
        this._classes = [];
    }

    get classes(): Class[] {
        return this._classes;
    }   
    
    addClass(_class: Class) {
        this._classes.push(_class);
    }

    isEqualTo(association: Association) {
        let _equals: boolean = true;
        let _classNames: Map<string, Class> = this.getClassNames();        
        association.classes.forEach(
            (_class: Class) => {                              
              if (_classNames.get(_class.name) == null) {                
                _equals = false;
              }
            }
        );
        return _equals;
    }

    private getClassNames(): Map<string, Class> {
        let _classNames: Map<string, Class> = new Map<string, Class>();
        this._classes.forEach(
            (_class: Class) => {                
                _classNames.set(_class.name, _class);
            }
        );
        return _classNames;
    }
}