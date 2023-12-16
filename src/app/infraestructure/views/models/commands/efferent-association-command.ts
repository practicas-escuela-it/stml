import { Direction } from "src/app/domain/builders/Diagram/types/Direction";
import { RelationType } from "src/app/domain/builders/Diagram/types/RelationType";
import { Command } from "./command";

export class EfferentAssociationCommand extends Command {
  override process(): void {
    this._diagramBuilder.coupling(Direction.EFFERENT, RelationType.ASSOCIATION);
  }
}
