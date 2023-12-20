import { Direction } from "../types/Direction";
import { RelationType } from "../types/RelationType";

export class Axis {
  private _direction: Direction;
  private _relationType: RelationType;
  private _depth: number;

  constructor(direction: Direction, relationType: RelationType = RelationType.ALL, depth: number = 3) {
    this._direction = direction;
    this._relationType = relationType;
    this._depth = depth;
  }

  get direction(): Direction {
    return this._direction;
  }

  get relationType(): RelationType {
    return this._relationType;
  }

  get depth(): number {
    return this._depth;
  }
}
