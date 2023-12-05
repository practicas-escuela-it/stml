import { DiagramBuilder } from "../domain/builders/Diagram/DiagramBuilder";
import { ModelBuilder } from "../domain/builders/ModelBuilder";
import { OutputFormatType } from "../outputViews/OutputFormatType";

describe("DiagramBuilder", () => {
    it("Given a model with only one class, when we request that class from the diagram's constructor, then we get the correct output", () => {        
       let diagramBuilder: DiagramBuilder = new DiagramBuilder(new ModelBuilder("class Car").build(), OutputFormatType.PlantUml);
       let diagram: string = diagramBuilder.setClass("Car").build();
       console.log(diagram);
       expect(diagram == "class Car {}");
    });
});