import { Class } from "./Class";

export class Composition {

    private _classes: Class[];

    constructor() {
        this._classes = [];
    }

    addClass(_class: Class) {
        this._classes.push(_class);
    }

    getClasses(): Class[] {
        return this._classes;
    }

    isEqualTo(composition: Composition): boolean {
        let _equals: boolean = true;
        let _classNames: Map<string, Class> = this.getClassNames();
        composition.getClasses().forEach(
            (_class: Class) => {
              if (_classNames.get(_class.name) == null) {
                _equals = false;
              }
            }
        );
        return _equals;
    }

    removeClasses(): void {
        this._classes.splice(0, this._classes.length);
        this._classes = [];
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

    remove(): void {
      this._classes.splice(0, this._classes.length);
      this._classes = [];
    }
}
