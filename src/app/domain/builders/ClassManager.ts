import { Class } from "../entities/Class";
import { Model } from "../entities/Model";
import { Package } from "../entities/package";

export class ClassManager {
   private static _instance: ClassManager;

   static getInstance(): ClassManager {
      if (this._instance == null) {
        this._instance = new ClassManager();
      }
      return this._instance;
   }

   private _classes: Map<string, Class> = new Map<string, Class>();
   private _packages: Package[] = [];
   private _currentPackage: Package | undefined;

   private constructor() {
      this.clear();
   }

   clear() {
      this._classes = new Map<string, Class>();
      this._packages = [];
  }

  createPackage(packageName: string): void {
    console.log("INTENTANDO CREAR PAGQUETE: " + packageName);
    this._currentPackage = this._packages.find((_package: Package) => _package.nameEqualTo(packageName));
    if (this._currentPackage == null) {
      this._currentPackage = new Package(packageName);
      console.log("PACKAGENAME: " + packageName)
       this._packages.push(this._currentPackage);
    }
  }

   getClass(identifier: string): Class | undefined {
      if (this._classes.get(identifier.trim()) == undefined) {
        this._classes.set(identifier.trim(), new Class(identifier.trim()));
      }
      let _class: Class | undefined = this._classes.get(identifier.trim());
      if (_class != undefined && this._currentPackage != undefined) {
         this._currentPackage?.addClass(_class);
      }
      return _class;
   }

   getModel(): Model {
     let _model = new Model();
     this._classes.forEach(
        (_class: Class) => {
           _model.addClass(_class);
        }
     );
     this._packages.forEach(
      (_package: Package) => {
        _model.addPackage(_package);
      }
     )
     return _model;
   }
}
