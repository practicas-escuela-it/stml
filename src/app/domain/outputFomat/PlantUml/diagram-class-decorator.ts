import { Class } from "../../entities/Class";
import { Relation } from "../../entities/Relation";
import { OutputFormatter } from "../OutputFormatter";
import { PlantUmlOutputFormatter } from "./PlantUmlOutputFormatter";

export class DiagramClassDecorator extends PlantUmlOutputFormatter implements OutputFormatter {

  private _formattedClasses: string[] = [];

  override format(): string {
    let _diagramClass: Class = this._model.getClasses()[0];
    this._formatDiagramClass(_diagramClass);
    this._formatEfferentClassesOf(_diagramClass);
    this._formatAfferentClassesOf(_diagramClass);

    this._model.getClasses().forEach(
      (_class: Class) => {
        if (this._formattedClasses.find((_formattedClass: string) => _class.name == _formattedClass) == null) {
           super.formatClass(_class);
        }
      }
    );
    return "@startuml\n\n" + this._outputForClassesBody + this._outputForRelationsBetweenClasses + "\n@enduml\n";
  }

  private _formatDiagramClass(_diagramClass: Class) {
    this._outputForClassesBody += "class " + _diagramClass.name + " #lightblue;line:blue ";
    this._formattedClasses.push(_diagramClass.name);
    this.formatClass(_diagramClass);
  }

  private _formatEfferentClassesOf(_diagramClass: Class) {
    this._formatEfferentCompositionClassesOf(_diagramClass);
    this._formatEfferentAssociationClassesOf(_diagramClass);
    this._formatEfferentUseClassesOf(_diagramClass);
    this._formatInheritClassesOf(_diagramClass);
  }

  private _formatEfferentCompositionClassesOf(_diagramClass: Class) {
    _diagramClass.getCompositions().forEach(
       (_composition: Relation) => {
         _composition.getClasses().forEach(
          (_class: Class) => {
            this._formatClassHead(_class);
          }
         )
       }
     )
  }

  private _formatEfferentAssociationClassesOf(_class: Class) {
     _class.getAssociations().forEach(
      (_association: Relation) => {
        _association.getClasses().forEach(
          (_class: Class) => {
            this._formatClassHead(_class);
          }
        );
      }
     )
  }

  private _formatEfferentUseClassesOf(_class: Class) {
     _class.getUses().forEach(
      (_use: Relation) => {
        _use.getClasses().forEach(
          (_class: Class) => {
           this._formatClassHead(_class);
          }
        )
      }
     );
  }

  private _formatInheritClassesOf(_class: Class) {
    _class.getInherits().forEach(
      (_inherit: Class) => {
        this._formatClassHead(_inherit);
      }
    )
  }

  private _formatClassHead(_class: Class) {
    this._outputForClassesBody += "class " + _class.name + " #pink;line:red ";
    this.formatClass(_class);
    this._formattedClasses.push(_class.name);
  }

  private _formatAfferentClassesOf(_diagramClass: Class) {
    this._model.getClasses().forEach(
      (_class: Class) => {
        if (_class.hasAnyRelationWith(_diagramClass)) {
          this._outputForClassesBody += "class " + _class.name + " #palegreen;line:green ";
          this.formatClass(_class);
          this._formattedClasses.push(_class.name);
        }
      }
    )
  }

  protected override formatClass(_class: Class) {
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
