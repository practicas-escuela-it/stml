import { Class } from "./Class";
import { Multiplicity } from "./Multiplicity";

export class Composition {

    private _classes: Class[];
    private _multiplicity: Map<string, Multiplicity>;

    constructor() {
        this._classes = [];
        this._multiplicity = new Map<string, Multiplicity>();
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

    addMultiplicity(name: string | undefined, multiplicity: Multiplicity) {
      if (name != null) {
          this._multiplicity.set(name, multiplicity);
      }
    }

    getStartMultiplicity(name: string): string {
       let start: string = "";
       let _multiplicity: Multiplicity | undefined = this._multiplicity.get(name);
       if (_multiplicity != null) {
          start = _multiplicity.getStart();
       }
       return start;
    }

    getEndMultiplicity(name: string): string {
      let start: string = "";
       let _multiplicity: Multiplicity | undefined = this._multiplicity.get(name);
       if (_multiplicity != null) {
          start = _multiplicity.getEnd();
       }
       return start;
    }

    hasMultiplicityWith(name: string): boolean {
      return this._multiplicity.get(name) != null;
    }

    getMultiplicityWith(name: string): Multiplicity  {
      let multiplicity: Multiplicity | null = this._multiplicity.get(name) ?? null;
      if (multiplicity != null) {
        return multiplicity;
      }
      return new Multiplicity();
    }
}
