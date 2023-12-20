import { ActionType } from "../domain/builders/Diagram/ActionType";
import { DiagramBuilder } from "../domain/builders/Diagram/DiagramBuilder";
import { Axis } from "../domain/builders/Diagram/relations/Axis";
import { Direction } from "../domain/builders/Diagram/types/Direction";
import { RelationType } from "../domain/builders/Diagram/types/RelationType";
import { ModelBuilder } from "../domain/builders/ModelBuilder";
import { OutputFormatType } from "../domain/outputFomat/OutputFormatType";
import { Strings } from "../domain/utils/strings";

describe("DiagramBuilder", () => {
  const testCases1 = [
    { _modelClass: "Car", _model: "class Car", _expected: "@startuml class Car { } @enduml" },
    { _modelClass: "Car", _model: "class Car inherits Vehicle composition Door class Gass attribute price real, amount real composition Door class Vehicle attribute color, cilynders int association Gass class Door attribute variable1", _expected: "@startuml class Car extends Vehicle { } class Door { -variable1: void } class Vehicle { -color: void -cilynders: int } class Gass { -price: real -amount: real } Car *--> Door Vehicle o--> Gass Gass *--> Door @enduml" },
    { _modelClass: "Car", _model: "class Car attribute isStarted bool, dos int", _expected: "@startuml class Car { -isStarted: bool -dos: int } @enduml" },
    { _modelClass: "Car", _model: "class Car method run()", _expected: "@startuml class Car { +run() } @enduml" },
    { _modelClass: "Car", _model: "class Car composition Engine", _expected: "@startuml class Car { } class Engine { } Car *--> Engine @enduml" },
    { _modelClass: "Car", _model: "class Car association Batery, Panel", _expected: "@startuml class Car { } class Batery { } class Panel { } Car o--> Batery Car o--> Panel @enduml" },
    { _modelClass: "Car", _model: "class Car use Cilinder, Injector", _expected: "@startuml class Car { } class Cilinder { } class Injector { } Car ..> Cilinder Car ..> Injector @enduml" }
  ];

  testCases1.forEach(test => {
    it(`Given model '$_model', when we request REMOVE without filter, then we get '$_expected'`, () => {
      let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder(test._model).build(), OutputFormatType.PlantUml);
      let diagram: string = diagramBuilder.addClass(test._modelClass).build();
      diagram = new Strings().clearSpaces(diagram);
      console.log(diagram);
      expect(diagram.trim() == test._expected).toBeTruthy();
    });
  });

  const testCases2 = [
    { _modelClass: "Car", _model: "class Car inherits Vehicle class Vehicle", _operation: "REMOVE efferent inherit", _direction: Direction.EFFERENT, _relationType: RelationType.INHERIT, _expected: "@startuml class Car { } @enduml" },
    { _modelClass: "Car", _model: "class Car composition Engine class Engine", _operation: "REMOVE efferent composition", _direction: Direction.EFFERENT, _relationType: RelationType.COMPOSITION, _expected: "@startuml class Car { } @enduml" },
    { _modelClass: "Car", _model: "class Car association Engine class Engine", _operation: "REMOVE efferent association", _direction: Direction.EFFERENT, _relationType: RelationType.ASSOCIATION, _expected: "@startuml class Car { } @enduml" },
    { _modelClass: "Car", _model: "class Car use Engine class Engine", _operation: "REMOVE efferent use", _direction: Direction.EFFERENT, _relationType: RelationType.USE, _expected: "@startuml class Car { } @enduml" },
    { _modelClass: "Vehicle", _model: "class Vehicle class Car inherits Vehicle", _operation: "REMOVE afferent inherit", _direction: Direction.AFFERENT, _relationType: RelationType.INHERIT, _expected: "@startuml class Vehicle { } @enduml" },
    { _modelClass: "Vehicle", _model: "class Vehicle class Car composition Vehicle", _operation: "REMOVE afferent composition", _direction: Direction.AFFERENT, _relationType: RelationType.COMPOSITION, _expected: "@startuml class Vehicle { } @enduml" },
    { _modelClass: "Vehicle", _model: "class Vehicle class Car association Vehicle", _operation: "REMOVE afferent association", _direction: Direction.AFFERENT, _relationType: RelationType.ASSOCIATION, _expected: "@startuml class Vehicle { } @enduml" },
    { _modelClass: "Vehicle", _model: "class Vehicle class Car use Vehicle", _operation: "REMOVE afferent use", _direction: Direction.AFFERENT, _relationType: RelationType.USE, _expected: "@startuml class Vehicle { } @enduml" }
  ];

  testCases2.forEach(test => {
    it(`Given model '$_model', when we request REMOVE '$_operation', then we get '$_expected'`, () => {
      let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder(test._model).build(), OutputFormatType.PlantUml);
      let diagram: string = diagramBuilder.setClass(test._modelClass, ActionType.REMOVE)
        .coupling(test._direction, test._relationType)
        .build();
      diagram = new Strings().clearSpaces(diagram);
      expect(diagram.trim() == test._expected).toBeTruthy();
    });
  });

  it(`Given model, when we request remove attribute, then we get all right`, () => {
    let _model: string = "class Vehicle attribute door int, claxon int";
    let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder(_model).build(), OutputFormatType.PlantUml);
    let diagram: string = diagramBuilder.setClass("Vehicle", ActionType.REMOVE)
      .attribute(["door"])
      .build();
    diagram = new Strings().clearSpaces(diagram);
    expect(diagram.trim() == "@startuml class Vehicle { -claxon: int } @enduml").toBeTruthy();
  });


  it(`Given model, when we request remove method, then we get all right`, () => {
    let _model: string = "class Vehicle method run(velocity int) method stop()";
    let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder(_model).build(), OutputFormatType.PlantUml);
    let diagram: string = diagramBuilder.setClass("Vehicle", ActionType.REMOVE)
      .method(["run"])
      .build();
    diagram = new Strings().clearSpaces(diagram);
    expect(diagram.trim() == "@startuml class Vehicle { +stop() } @enduml").toBeTruthy();
  });

  it('Given model, when we request Add without filter, then we get empty plantuml model', () => {
    let _model = "class Car inherits Vehicle attribute tipo int class Vehicle";
    let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder(_model).build(), OutputFormatType.PlantUml);
    let diagram: string = diagramBuilder.setClass("Car", ActionType.ADD)
      .build();
    diagram = new Strings().clearSpaces(diagram);
    expect(diagram.trim() == "@startuml class Car { } @enduml").toBeTruthy();
  });

  const testCases3 = [
    { _modelClass: "Car", _model: "class Car inherits Vehicle attribute tipo int", _operation: "ADD efferent inherit", _direction: Direction.EFFERENT, _relationType: RelationType.INHERIT, _expected: "@startuml class Car extends Vehicle { } class Vehicle { } @enduml" },
    { _modelClass: "Car", _model: "class Car inherits Vehicle attribute tipo int composition Engine", _operation: "ADD efferent composition", _direction: Direction.EFFERENT, _relationType: RelationType.COMPOSITION, _expected: "@startuml class Car { } class Engine { } Car *--> Engine @enduml" },
    { _modelClass: "Car", _model: "class Car attribute tipo int association Engine use Gasoil", _operation: "ADD efferent association", _direction: Direction.EFFERENT, _relationType: RelationType.ASSOCIATION, _expected: "@startuml class Car { } class Engine { } Car o--> Engine @enduml" },
    { _modelClass: "Car", _model: "class Car composition Engine use Gasoil", _operation: "ADD efferent use", _direction: Direction.EFFERENT, _relationType: RelationType.USE, _expected: "@startuml class Car { } class Gasoil { } Car ..> Gasoil @enduml" },
    { _modelClass: "Vehicle", _model: "class Vehicle attribute velocity int composition Engine class Car inherits Vehicle attribute isStarted int", _operation: "ADD afferent inherit", _direction: Direction.AFFERENT, _relationType: RelationType.INHERIT, _expected: "@startuml class Vehicle { } class Car extends Vehicle { -isStarted: int } @enduml" },
    { _modelClass: "Vehicle", _model: "class Car attribute tipo int composition Vehicle class Vehicle attribute velocity int composition Engine", _operation: "ADD afferent composition", _direction: Direction.AFFERENT, _relationType: RelationType.COMPOSITION, _expected: "@startuml class Vehicle { } class Car { -tipo: int } Car *--> Vehicle @enduml" },
    { _modelClass: "Vehicle", _model: "class Car attribute tipo int association Vehicle class Vehicle attribute velocity int composition Engine", _operation: "ADD afferent composition", _direction: Direction.AFFERENT, _relationType: RelationType.ASSOCIATION, _expected: "@startuml class Vehicle { } class Car { -tipo: int } Car o--> Vehicle @enduml" },
    { _modelClass: "Vehicle", _model: "class Car attribute tipo int use Vehicle class Vehicle attribute velocity int composition Engine", _operation: "ADD afferent composition", _direction: Direction.AFFERENT, _relationType: RelationType.USE, _expected: "@startuml class Vehicle { } class Car { -tipo: int } Car ..> Vehicle @enduml" }
  ];
  testCases3.forEach(test => {
    it(`Given model '$_model' for ADD, when we request ADD '$_operation', then we get '$_expected'`, () => {
      let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder(test._model).build(), OutputFormatType.PlantUml);
      let diagram: string = diagramBuilder.setClass(test._modelClass, ActionType.ADD)
        .coupling(test._direction, test._relationType)
        .build();
      diagram = new Strings().clearSpaces(diagram);
      console.log(diagram);
      expect(diagram.trim() == test._expected).toBeTruthy();
    });
  });

  it('Given model, when we request Add attribute, then we get plantuml model with attribute', () => {
    let _model = "class Car attribute tipo int, isStarted bool";
    let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder(_model).build(), OutputFormatType.PlantUml);
    let diagram: string = diagramBuilder.setClass("Car", ActionType.ADD)
      .attribute(["isStarted"])
      .build();
    diagram = new Strings().clearSpaces(diagram);
    expect(diagram.trim() == "@startuml class Car { -isStarted: bool } @enduml").toBeTruthy();
  });

  it('Given model, when we request Add method, then we get plantuml model with requested method', () => {
    let _model = new Strings().clearSpaces("class Car inherits Vehicle attribute tipo int, isStarted bool method run (velocity real, aceleration)");
    let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder(_model).build(), OutputFormatType.PlantUml);
    let diagram: string = diagramBuilder.setClass("Car", ActionType.ADD)
      .method(["run"])
      .build();
    diagram = new Strings().clearSpaces(diagram);
    console.log(diagram)
    expect(diagram.trim() == "@startuml class Car { +run(velocity: real,aceleration: void) } @enduml").toBeTruthy();
  });
});
