import { DiagramBuilder } from "src/app/domain/builders/Diagram/DiagramBuilder";

export abstract class Command {
   protected _diagramBuilder: DiagramBuilder;

   constructor(diagramBuilder: DiagramBuilder) {
      this._diagramBuilder = diagramBuilder;
   }

   abstract process(): void;


}
