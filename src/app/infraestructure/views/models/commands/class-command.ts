import { DiagramBuilder } from "src/app/domain/builders/Diagram/DiagramBuilder";
import { Command } from "./command";
import { ActionType } from "src/app/domain/builders/Diagram/ActionType";

export class ClassCommand extends Command {

  private _className: string;
  private _actionType: Action
  constructor(diagramBuilder: DiagramBuilder, className: string, actionType: ActionType) {

  }

  override process(): void {
    throw new Error("Method not implemented.");
  }

}
