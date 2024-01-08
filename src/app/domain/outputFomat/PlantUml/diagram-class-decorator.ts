import { Class } from "../../entities/Class";
import { OutputFormatter } from "../OutputFormatter";
import { PlantUmlOutputFormatter } from "./PlantUmlOutputFormatter";

export class DiagramClassDecorator extends PlantUmlOutputFormatter implements OutputFormatter {

  override format(): string {
    let _diagramClass: Class = this._model.getClasses()[0];
    this.formatClass(_diagramClass);
    let i = 0;
    this._model.getClasses().forEach(
      (_class: Class) => {
        if (i > 0) {
           let _efferentClasses: Class[] = this._model.getEfferentHierarchyOf(_diagramClass);
           super.formatClass(_class);
        }
        i++;
      }
    );
    return "@startuml\n\n" + this._outputForClassesBody + this._outputForRelationsBetweenClasses + "\n@enduml\n";
  }

  protected override formatClass(_class: Class) {
    this._outputForClassesBody += "class " + _class.name + " #lightblue;line:blue "
    if (_class.hasInherit()) {
      this._outputForClassesBody += " extends "
      this.formatInherits(_class);
    }
    this._outputForClassesBody += " { \n";
    this.formatAttributes(_class);
    this.formatMethods(_class);
    this._outputForClassesBody += "} \n";
    this.formatCompositions(_class);
    this.formatUses(_class);
    this.formatAssociations(_class);
  }
}
