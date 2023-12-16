import { Direction } from "src/app/domain/builders/Diagram/types/Direction";
import { Command } from "./command";
import { RelationType } from "src/app/domain/builders/Diagram/types/RelationType";

export class AfferentInheritCommand extends Command {
  override process(): void {
    this._diagramBuilder.coupling(Direction.AFFERENT, RelationType.INHERIT);
  }
}
