import { Association } from "./Asociation";
import { Class } from "./Class";
import { Composition } from "./Composition";
import { Use } from "./Use";

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
        if (this._map.get(_class.name) == null) {
           this._map.set(_class.name, _class);
           this._classes.push(_class);
        }
    }

    addRelationClassesOf(_class: Class): void {
        let _refClass: Class = this._map.get(_class.name);
        this.addAssociationRelationClassesOf(_refClass);
        this.addCompositionRelationClassesOf(_refClass);
        this.addUseRelationClassesOf(_refClass);
        this.addInheritRelationClassesOf(_refClass);
    }

    private addAssociationRelationClassesOf(_class: Class): void {
        _class.getAssociations().forEach(
          (_association: Association) => {
             _association.classes.forEach(
                (_associationClass: Class) => {
                    this.addClass(_associationClass);
                }
             )
          }
        );
    }

    private addCompositionRelationClassesOf(_class: Class): void {
        _class.getCompositions().forEach(
            (_composition: Composition) => {
               _composition.getClasses().forEach(
                (_compositionClass: Class) => {
                    this.addClass(_compositionClass);
                }
               )
            }
        )
    }

    private addUseRelationClassesOf(_class: Class): void {
        _class.getUses().forEach(
            (_use: Use) => {
               _use.classes.forEach(
                (_useClass: Class) => {
                    this.addClass(_useClass);
                }
               )
            }
        )
    }

    private addInheritRelationClassesOf(_class: Class): void {
       _class.getInherits().forEach(
         (_inheritClass: Class) => {
            this.addClass(_inheritClass);
         }
       )
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