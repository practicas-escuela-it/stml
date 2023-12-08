import { ActionType } from "../domain/builders/Diagram/ActionType";
import { DiagramBuilder } from "../domain/builders/Diagram/DiagramBuilder";
import { Direction } from "../domain/builders/Diagram/types/Direction";
import { RelationType } from "../domain/builders/Diagram/types/RelationType";
import { ModelBuilder } from "../domain/builders/ModelBuilder";
import { OutputFormatType } from "../domain/outputFomat/OutputFormatType";
import { Strings } from "../domain/utils/strings";

describe.each([
    { _modelClass: "Car", _model: "class Car", _expected: "@startuml class Car { } @enduml" },
    { _modelClass: "Car", _model: "class Car inherits Vehicle", _expected: "@startuml class Car extends Vehicle { } class Vehicle { } @enduml" },
    { _modelClass: "Car", _model: "class Car attribute isStarted bool, dos int", _expected: "@startuml class Car { -isStarted: bool -dos: int } @enduml" },
    { _modelClass: "Car", _model: "class Car method run()", _expected: "@startuml class Car { +run() } @enduml" },
    { _modelClass: "Car", _model: "class Car composition Engine", _expected: "@startuml class Car { } class Engine { } Car *--> Engine @enduml" },
    { _modelClass: "Car", _model: "class Car association Batery, Panel", _expected: "@startuml class Car { } class Batery { } class Panel { } Car o--> Batery Car o--> Panel @enduml" },
    { _modelClass: "Car", _model: "class Car use Cilinder, Injector", _expected: "@startuml class Car { } class Cilinder { } class Injector { } Car ..> Cilinder Car ..> Injector @enduml" }
])
    ("DiagramBuilder for REMOVE without filters", ({ _modelClass, _model, _expected }) => {

        beforeEach(() => {
        });

        it(`Given model '${_model}', when we request that class from the diagramBuilder, then we get '${_expected}'`, () => {
            let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder(_model).build(), OutputFormatType.PlantUml);
            let diagram: string = diagramBuilder.setClass(_modelClass, ActionType.REMOVE).build();
            diagram = new Strings().clearSpaces(diagram);            
            expect(diagram.trim() == _expected).toBeTruthy();
        });
    });
