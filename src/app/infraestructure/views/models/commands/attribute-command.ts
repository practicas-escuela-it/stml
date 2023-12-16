import { Direction } from "src/app/domain/builders/Diagram/types/Direction";
import { Command } from "./command";
import { RelationType } from "src/app/domain/builders/Diagram/types/RelationType";

export class AttributeCommand extends Command {
  override process(): void {
    this._diagramBuilder.attribute([]);
  }
}
