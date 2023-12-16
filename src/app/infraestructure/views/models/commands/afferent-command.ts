import { Direction } from "src/app/domain/builders/Diagram/types/Direction";
import { Command } from "./command";

export class AfferentCommand extends Command {
  override process(): void {
    this._diagramBuilder.coupling(Direction.AFFERENT);
  }
}
