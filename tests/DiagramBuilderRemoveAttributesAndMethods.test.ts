import { ActionType } from "../domain/builders/Diagram/ActionType";
import { DiagramBuilder } from "../domain/builders/Diagram/DiagramBuilder";
import { ModelBuilder } from "../domain/builders/ModelBuilder";
import { OutputFormatType } from "../domain/outputFomat/OutputFormatType";
import { Strings } from "../domain/utils/strings";

describe("DiagramBuilder for REMOVE attribute and methods", () => {    
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
});    