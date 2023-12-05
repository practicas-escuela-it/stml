import { Class } from "./Class";

export class Model {

    private _classes: Class[];
    private _map: Map<string, Class>;

    constructor() {
        this._classes = [];
        this._map = new Map<string, Class>();
    }

    getClasses(): Class[] {
        let __classes: Class[] = []
        if (this._map.size > 0) {
            for (let value of this._map.values()) {
                __classes.push(value);
                // console.log("VALUE: " + entry[1]);
            }
        }        
       // return __classes; */
        return this._classes;
    }

    hasClasses(): boolean {
        return this._classes.length > 0;
    }

    getClass(className: string): Class {       
        return this._map.get(className) as Class;
    }

    addClass(_class: Class): void {
        this._map.set(_class.name, _class);
        this._classes.push(_class);
    }

    addClasses(_classes: Class[]): void {
        _classes.forEach(
            (_class: Class) => {
                if (!this._map.has(_class.name)) {
                    this.addClass(_class);
                }
            }
        );
    }

    removeClass(_class: Class): void {
         let _index: number = 0;        
         this._classes.forEach(
             (__class: Class) => {
                 if (__class.name.indexOf(_class.name) >= 0) {  
                                   
                     this._classes.splice(_index, 1);
                     this._map.delete(_class.name);
                     return;
                 }
                 _index++;
             }
         )         
    }

    removeClasses(_classes: Class[]): void {
        _classes.forEach(
            (_class: Class) => {
                this.removeClass(_class);
            }
        );
    }

    existsClass(className: string): boolean {
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
                this._map.set(_class.name, _class);
            }
        )
    }
}