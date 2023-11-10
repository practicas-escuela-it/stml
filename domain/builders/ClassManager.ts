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

   private _classes: Map<string, Class>;

   private constructor() {
      this._classes = new Map<string, Class>();
   } 
   
   getClass(identifier: string): Class | undefined {
      if (this._classes.get(identifier) == null) {
        this._classes.set(identifier, new Class(identifier));
      }
      return this._classes.get(identifier);
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
