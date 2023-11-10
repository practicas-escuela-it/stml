import { Class } from "./Class";

export class Model {
      

    private _classes: Class[];

    constructor() {
        this._classes = [];
    }

    getClasses(): Class[] {
        return this._classes;
    }

    hasClasses(): boolean {
        return this._classes.length > 0;
     } 

    getClass(className: string): Class {
        let _classReturn: Class = new Class("");
        this._classes.forEach(
            (_class: Class) => {
                if (_class.name == className) {                    
                    _classReturn = _class;
                }                
            }
        );
        return _classReturn;
    }

    addClass(_class: Class): void {
        this._classes.push(_class);
    }

    removeClass(_class: Class): void {
        let _index: number = 0;        
        this._classes.forEach(
            (__class: Class) => {
                if (__class.name.indexOf(_class.name) >= 0) {    
                                  
                    this._classes.splice(_index, 1);
                    return;
                }
                _index++;
            }
        )
    }    

    exists(className: string): boolean {        
        let result: boolean = false;        
        this._classes.forEach(
            (_class: Class) => {                
                if (_class.name.trim().indexOf(className.trim()) >= 0) {                    
                    result = true;
                }
            });
        return result;
    }   
   
    copy(model: Model) {
        model.getClasses().forEach(
            (_classToCopy: Class) => {
                let _class = new Class(_classToCopy.name);
                _class.copy(_classToCopy);
                this._classes.push(_class);
            }
        )
    }
}