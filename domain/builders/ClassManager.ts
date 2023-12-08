import { Class } from "../entities/Class";
import { Model } from "../entities/Model";

export class ClassManager {   
   
   private static _instance: ClassManager;
   
   static getInstance(): ClassManager {
      if (this._instance == null) {
        this._instance = new ClassManager();
      }
      return this._instance;
   }

   private _classes: Map<string, Class> = new Map<string, Class>();

   private constructor() {
      this.clear();
   } 
   
   clear() {
      this._classes = new Map<string, Class>();
  }

   getClass(identifier: string): Class | undefined {
      if (this._classes.get(identifier.trim()) == undefined) {         
        this._classes.set(identifier.trim(), new Class(identifier.trim()));
      }
      return this._classes.get(identifier.trim());
   }

   getAllClasses(): Model {
     let _model = new Model();
     this._classes.forEach(
        (_class: Class) => {
           _model.addClass(_class);
        }
     );     
     return _model;
   }
}
