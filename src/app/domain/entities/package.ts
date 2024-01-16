import { Class } from "./Class";

export class Package {
  private _name: string;
  private _classes: Class[];

  constructor(name: string) {
    this._name = name;
    this._classes = [];
  }

  get name(): string {
    return this._name;
  }

  nameEqualTo(packageName: string): boolean {
     return this._name == packageName;
  }

  addClass(_class: Class) {
    this._classes.push(_class);
  }
}
