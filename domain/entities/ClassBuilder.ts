import { Class } from "./Class";

export class ClassBuilder {
   
   private _classes: Map<string, Class>;
   private static _instance: ClassBuilder;
   
   private constructor() {
      this._classes = new Map<string, Class>();
   }

   static getInstance(): ClassBuilder {
      if (this._instance == null) {
        this._instance = new ClassBuilder();
      }
      return this._instance;
   }

   getClass(identifier: string): Class | undefined {
      if (this._classes.get(identifier) == null) {
        this._classes.set(identifier, new Class(identifier));
      }
      return this._classes.get(identifier);
   }

   getAllClasses(): Class[] {
     let _classes: Class[] = [];
     this._classes.forEach(
        (_class: Class) => {
           _classes.push(_class);
        }
     )
     return _classes;
   }
}