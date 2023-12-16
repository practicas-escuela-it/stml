import { Component, OnInit } from '@angular/core';
import { ModelBuilder } from 'src/app/domain/builders/ModelBuilder';
import { OutputFormatType } from 'src/app/domain/outputFomat/OutputFormatType';
import { DiagramBuilder } from 'src/app/domain/builders/Diagram/DiagramBuilder';
import { Model } from 'src/app/domain/entities/Model';
import { Class } from 'src/app/domain/entities/Class';
import { input1 } from 'src/app/domain/controllers/input1';
import { OutputFormatter } from 'src/app/domain/outputFomat/OutputFormatter';
import { OutputFormatterFactory } from 'src/app/domain/outputFomat/OuputFormatterFactory';
import { ActionType } from 'src/app/domain/builders/Diagram/ActionType';
import { Direction } from 'src/app/domain/builders/Diagram/types/Direction';
import { RelationType } from 'src/app/domain/builders/Diagram/types/RelationType';


@Component({
  selector: 'app-diagram-builder',
  templateUrl: './diagram-builder.component.html',
  styleUrls: ['./diagram-builder.component.scss']
})
export class DiagramBuilderComponent implements OnInit {

  fileContent: string | undefined;
  diagramBuilder: DiagramBuilder;
  diagramUml: string;
  private _model: Model;
  fullModel: boolean;
  selectedClass: string;
  showAttributes: boolean;
  showMethods: boolean;
  forAdd: boolean;
  forRemove: boolean;


  constructor() {
    this.fileContent = "";
    this.diagramUml = "";
    this._model = new Model();
    this.diagramBuilder = new DiagramBuilder(this._model, OutputFormatType.PlantUml);
    this.fullModel = true;
    this.selectedClass = "";
    this.showAttributes = false;
    this.showMethods = false;
    this.forRemove = false;
    this.forAdd = false;
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this._model = new Model();
    this.diagramBuilder = new DiagramBuilder(this._model, OutputFormatType.PlantUml);
    this.fileContent = input1;
    this.build();
  }

  build(): void {
    if (this.fileContent != null) {
      this._model = new ModelBuilder(this.fileContent).build();
      if (this.fullModel) {
        let outputFormatter: OutputFormatter = new OutputFormatterFactory(OutputFormatType.PlantUml).instance(this._model);
        this.diagramUml = outputFormatter.format();
      } else {
        console.log("aplicando")
        this.diagramBuilder.setModel(this._model);
        this._applyCommands();
      }
    }
  }

  _applyCommands(): void {
    this.diagramUml = this.diagramBuilder.build();
    this.reset();
  }

  reset(): void {
    this.diagramBuilder.clear();
    this.diagramUml = "";
    this.selectedClass = "";
    this.fullModel = true;
    this.forAdd = this.forRemove = false;
    this._initFilter(ActionType.ADD);
  }

  isBuildedModel(): boolean {
    return this.diagramUml != "";
  }

  getClasses(): Class[] {
    return this._model.getClasses();
  }

  changeClass(): void {
     this.forRemove = false;
     this.clickAdd();
  }

  clickAdd(): void {
     this.forAdd = !this.forAdd;
     this.forRemove = false;
     this._initFilter(ActionType.ADD);
  }

  clickRemove(): void {
    this.forAdd = false;
    this.forRemove = !this.forRemove;
    this._initFilter(ActionType.REMOVE);
  }

  private _initFilter(actionType: ActionType): void {
    this.showAttributes = this.showMethods = false;
    console.log("Clase selecionada: " + this.selectedClass)
    this.diagramBuilder.setClass(this.selectedClass, actionType);
  }

  clickAttributes(): void {
    this.diagramBuilder.attribute();
  }

  clickMethods(): void {
    this.diagramBuilder.method();
  }

  clickEfferent(): void {
    this.diagramBuilder.coupling(Direction.EFFERENT);
  }

  clickEfferentAssociation(): void {
    this.diagramBuilder.coupling(Direction.EFFERENT, RelationType.ASSOCIATION);
  }

  clickEfferentComposition(): void {
    this.diagramBuilder.coupling(Direction.EFFERENT, RelationType.COMPOSITION);
 }

  clickEfferentUse(): void {
    this.diagramBuilder.coupling(Direction.EFFERENT, RelationType.USE);
  }

  clickEfferentInherit(): void {
    this.diagramBuilder.coupling(Direction.EFFERENT, RelationType.INHERIT);
  }

  clickAfferent(): void {
    this.diagramBuilder.coupling(Direction.AFFERENT)
 }

  clickAfferentAssociation(): void {
    this.diagramBuilder.coupling(Direction.AFFERENT, RelationType.ASSOCIATION);
  }

  clickAfferentComposition(): void {
    this.diagramBuilder.coupling(Direction.AFFERENT, RelationType.COMPOSITION);
  }

  clickAfferentUse(): void {
    this.diagramBuilder.coupling(Direction.AFFERENT, RelationType.USE);
  }

  clickAfferentInherit(): void {
    this.diagramBuilder.coupling(Direction.AFFERENT, RelationType.INHERIT);
  }
}
