import { DiagramBuilder } from "src/app/domain/builders/Diagram/DiagramBuilder";
import { Command } from "./command";
import { ActionType } from "src/app/domain/builders/Diagram/ActionType";

export class RemoveCommand extends Command {

  private _className: string;

  constructor(diagramBuilder: DiagramBuilder, className: string) {
    super(diagramBuilder);
    this._className = className;
  }

  override process(): void {
    this._diagramBuilder.setClass(this._className, ActionType.REMOVE);
  }
}
