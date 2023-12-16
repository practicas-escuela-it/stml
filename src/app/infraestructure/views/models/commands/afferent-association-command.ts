import { Direction } from "src/app/domain/builders/Diagram/types/Direction";
import { Command } from "./command";
import { RelationType } from "src/app/domain/builders/Diagram/types/RelationType";

export class AfferentAssociationCommand extends Command {
  override process(): void {
    this._diagramBuilder.coupling(Direction.AFFERENT, RelationType.ASSOCIATION);
  }
}
