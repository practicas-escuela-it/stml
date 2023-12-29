export class Multiplicity {
  private _start: string;
  private _end: string;

  constructor(start: string = "", end: string = "") {
    this._start = start;
    this._end = end;
  }

  getStart(): string {
    return this._start;
  }

  getEnd(): string {
     return this._end;
  }


  isValid(): boolean {
    return Number(this._start) >= 0 && (Number(this._end) > 0 || this._end.toLowerCase() == "n");
  }

  copy(toCopy: Multiplicity): void {
    this._start = toCopy._start;
    this._end = toCopy._end;
  }
}
