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
  classToRemove: string;

  constructor() {
    this.fileContent = "";
    this.diagramUml = "";
    this._model = new Model();
    this.diagramBuilder = new DiagramBuilder(this._model, OutputFormatType.DiagramClassDecorator);
    this.fullModel = true;
    this.selectedClass = "";
    this.classToRemove = "";
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this._model = new Model();
    this.fileContent = input1;
    if (this.fileContent != null) {
      this._model = new ModelBuilder(this.fileContent).build();
      this.reset();
      this.build();
    }
  }

  build(): void {
    if (this.fullModel) {
      let outputFormatter: OutputFormatter = new OutputFormatterFactory(OutputFormatType.PlantUml).instance(this._model);
      this.diagramUml = outputFormatter.format();
    } else {
      console.log("aplicando")
      this.diagramBuilder.addAttribute().addMethod();
      this.diagramUml = this.diagramBuilder.build();
    }
  }

  reset(): void {
    this.diagramUml = "";
    this.selectedClass = "";
    this.classToRemove = "";
    this.fullModel = true;
    this._initDiagramBuilder();
  }

  private _initDiagramBuilder() {
    this.diagramBuilder = new DiagramBuilder(this._model, OutputFormatType.DiagramClassDecorator);
  }

  isBuildedModel(): boolean {
    return this.diagramUml != "";
  }

  getClasses(): Class[] {
    return this._model.getClasses();
  }

  changeClass(): void {
    this.classToRemove = "";
    this._initDiagramBuilder();
    this.diagramBuilder.addClass(this.selectedClass);
    this.build();
  }

  clickFullModel(): void {
     this.reset();
     this.build();
  }

  clickAttributes(): void {
    this.diagramBuilder.addAttribute();
  }

  clickMethods(): void {
    this.diagramBuilder.addMethod();
  }

  clickRemoveAllContext(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.EFFERENT, RelationType.ALL));
    this.diagramBuilder.removeCoupling(new Axis(Direction.AFFERENT, RelationType.ALL));
    this.build();
  }

  clickAddAllContext(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.ALL));
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.ALL));
    this.build();
  }

  clickRemoveEfferentContext(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.EFFERENT, RelationType.ALL));
    this.build();
  }

  clickAddEfferentContext(): void {
    console.log("Aplicando contexto efferente")
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.ALL));
    this.build();
  }

  clickRemoveEfferentAssociation(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.EFFERENT, RelationType.ASSOCIATION));
    this.build();
  }

  clickAddEfferentAssociation(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.ASSOCIATION));
    this.build();
  }

  clickAddEfferentComposition(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.COMPOSITION));
    this.build();
  }

  clickRemoveEfferentComposition(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.EFFERENT, RelationType.COMPOSITION));
    this.build();
  }

  clickRemoveEfferentUse(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.EFFERENT, RelationType.USE));
    this.build();
  }

  clickAddEfferentUse(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.USE));
    this.build();
  }

  clickRemoveEfferentInherit(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.EFFERENT, RelationType.INHERIT));
    this.build();
  }

  clickAddEfferentInherit(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.EFFERENT, RelationType.INHERIT));
    this.build();
  }

  clickRemoveAfferentContext(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.AFFERENT, RelationType.ALL));
    this.build();
  }

  clickAddAfferentContext(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.ALL));
    this.build();
  }

  clickRemoveAfferentAssociation(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.AFFERENT, RelationType.ASSOCIATION));
    this.build();
  }

  clickAddAfferentAssociation(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.ASSOCIATION));
    this.build();
  }

  clickRemoveAfferentComposition(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.AFFERENT, RelationType.COMPOSITION));
    this.build();
  }

  clickAddAfferentComposition(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.COMPOSITION));
    this.build();
  }

  clickRemoveAfferentUse(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.AFFERENT, RelationType.USE));
    this.build();
  }

  clickAddAfferentUse(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.USE));
    this.build();
  }

  clickRemoveAfferentInherit(): void {
    this.diagramBuilder.removeCoupling(new Axis(Direction.AFFERENT, RelationType.INHERIT));
    this.build();
  }

  clickAddAfferentInherit(): void {
    this.diagramBuilder.addCoupling(new Axis(Direction.AFFERENT, RelationType.INHERIT));
    this.build();
  }

  getDiagramClasses(): Class[] {
    return this.diagramBuilder.getClasses();
  }

  removeClass(): void {
    if (this.classToRemove != "") {
       this.diagramBuilder.removeClass(this.classToRemove);
       this.build();
    }
  }
}
