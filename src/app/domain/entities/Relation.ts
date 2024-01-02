import { Multiplicity } from "./Multiplicity";

export class Relation {

  private _multiplicity: Map<string, Multiplicity>;

  constructor() {
    this._multiplicity = new Map<string, Multiplicity>();
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
