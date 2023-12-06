import { DiagramBuilder } from "../domain/builders/Diagram/DiagramBuilder";
import { ModelBuilder } from "../domain/builders/ModelBuilder";
import { OutputFormatType } from "../domain/outputFomat/OutputFormatType";
import { Strings } from "../domain/utils/strings";

describe("DiagramBuilder", () => {
    it("Given a model with only one empty class, when we request that class from the diagram's constructor, then we get the correct output", () => {        
       let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder("class Car").build(), OutputFormatType.PlantUml);
       let diagram: string = diagramBuilder.setClass("Car").build();                   
       let expectedDiagram: string = "@startuml class Car { } @enduml";
       diagram = new Strings().clearSpaces(diagram);
       console.log(diagram);
       expect(diagram.trim() == expectedDiagram).toBeTruthy();
    });

    it("Given a model with a class and an attribute, when we request that class from the diagram's constructor, then we get the correct output", () => {
        let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder("class Car attribute isStarted").build(), OutputFormatType.PlantUml); 
        let diagram: string = diagramBuilder.setClass("Car").build();                   
        let expectedDiagram: string = "@startuml class Car { -isStarted: void } @enduml";
        diagram = new Strings().clearSpaces(diagram);
        console.log(diagram);
        expect(diagram.trim() == expectedDiagram).toBeTruthy();
    });
});