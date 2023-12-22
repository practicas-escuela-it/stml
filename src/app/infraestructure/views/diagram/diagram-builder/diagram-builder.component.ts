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
import { Axis } from 'src/app/domain/builders/Diagram/relations/Axis';


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
    this.fileContent = input1;
    if (this.fileContent != null) {
      this._model = new ModelBuilder(this.fileContent).build();
      this.diagramBuilder = new DiagramBuilder(this._model, OutputFormatType.PlantUml);
      this.diagramBuilder.addAttribute().addMethod();
      this.build();
    }
  }

  build(): void {
    if (this.fullModel) {
      let outputFormatter: OutputFormatter = new OutputFormatterFactory(OutputFormatType.PlantUml).instance(this._model);
      this.diagramUml = outputFormatter.format();
    } else {
      console.log("aplicando")
      this._applyCommands();
    }
  }

  _applyCommands(): void {
    this.diagramUml = this.diagramBuilder.build();
    this.diagramBuilder.clear();
    //this.reset();
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

  clickAddEfferentContext(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.ALL));
  }

  clickRemoveEfferentContext(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.EFFERENT, RelationType.ALL));
  }

  clickRemove(): void {
    this.forAdd = false;
    this.forRemove = !this.forRemove;
    this._initFilter(ActionType.REMOVE);
  }

  private _initFilter(actionType: ActionType): void {
    this.showAttributes = this.showMethods = false;
    console.log("Clase selecionada: " + this.selectedClass)
    this.diagramBuilder.addClass(this.selectedClass);
  }

  clickAttributes(): void {
    this.diagramBuilder.addAttribute();
  }

  clickMethods(): void {
    this.diagramBuilder.addMethod();
  }

  clickEfferent(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.ALL));
  }

  clickEfferentAssociation(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.ASSOCIATION));
  }

  clickEfferentComposition(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.COMPOSITION));
  }

  clickEfferentUse(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.USE));
  }

  clickEfferentInherit(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.INHERIT));
  }

  clickAfferent(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.ALL));
  }

  clickAfferentAssociation(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.ASSOCIATION));
  }

  clickAfferentComposition(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.COMPOSITION));
  }

  clickAfferentUse(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.USE));
  }

  clickAfferentInherit(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.INHERIT));
  }
}
