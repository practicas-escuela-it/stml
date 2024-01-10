import { ModelBuilder } from "../domain/builders/ModelBuilder";
import { Class } from "../domain/entities/Class";
import { Model } from "../domain/entities/Model";
import { Attribute } from '../domain/entities/Attribute';
import { Method } from "../domain/entities/Method";
import { Parameter } from "../domain/entities/Parameter";
import { Relation } from "../domain/entities/Relation";

describe("ModelBuilder", () => {
    it("An empty input should return an empty model", () => {
       let model: Model = new ModelBuilder("").build();
       expect(model.hasClasses()).toBeFalsy();
    });

    it("An entry with a single empty class", () => {
       let model: Model = new ModelBuilder("class Car").build();
       let _carClass: Class = model.getClass("Car");
       expect(model.existsClass("Car") &&
                !_carClass.hasAssociations() &&
                !_carClass.hasInherit() &&
                !(_carClass.getCompositions().length > 0) &&
                !(_carClass.getUses().length > 0) &&
                !(_carClass.getMethods().length > 0) &&
                !(_carClass.getAttributes.length > 0)).toBeTruthy();
    });

    it("An entry with a single class with 1 untyped attribute", () => {
        let model: Model = new ModelBuilder("class Car attribute isStarted").build();
        let _carClass: Class = model.getClass("Car");
        let _existsAttribute: boolean = false;
        _carClass.getAttributes.forEach(
           (attribute: Attribute) => {
              if (attribute.identifier.value == "isStarted" && attribute.type.value == "") {
                _existsAttribute = true;
              }
           }
        )
        expect(model.existsClass("Car") && _existsAttribute).toBeTruthy();
    });

    it("Given a single class with a typed attribute, when get its model, then its name and attribute match", () => {
        let model: Model = new ModelBuilder("class Car attribute isStarted int").build();
        let _carClass: Class = model.getClass("Car");
        let _existsAttribute: boolean = false;
        _carClass.getAttributes.forEach(
           (attribute: Attribute) => {
              if (attribute.identifier.value == "isStarted" && attribute.type.value.trim().includes("int")) {
                _existsAttribute = true;
              }
           }
        )
        expect(model.existsClass("Car") && _existsAttribute).toBeTruthy();
    })

    it("Given a class with 3 attributes, when count the attributes of its model, then it gives us 3", () => {
      let model: Model = new ModelBuilder("class Car attribute attr1 int, attr2 int, attr3 byte").build();
      let _carClass: Class = model.getClass("Car");
      expect(model.existsClass("Car") && _carClass.getAttributes.length == 3).toBeTruthy();
  })

   it("Given a class with inheritance, when we get its model, then its inheritance object matches", () => {
      let model:Model = new ModelBuilder("class Car inherits Vehicle").build();
      let _carClass: Class = model.getClass("Car");
      let inherits: Class[] = _carClass.getInherits();
      expect(model.existsClass("Car") && _carClass.hasInherit() && inherits[0].name == "Vehicle").toBeTruthy();
   });

   it("Given a class with method without params, when we get its model, then its method name matches", () => {
      let model: Model = new ModelBuilder("class Car method run()").build();
      let _carClass: Class = model.getClass("Car");
      let methods: Method[] = _carClass.getMethods();
      let hasParameters: boolean = methods[0].hasParameters();
      expect(model.existsClass("Car") && methods.length > 0 && methods[0].identifier.value == "run" && !hasParameters).toBeTruthy();
   });

   it("Given a class with method with params, when we get its model, then its method name and parameters match", () => {
      let model: Model = new ModelBuilder("class Car method run(param1 int, param2 int)").build();
      let _carClass: Class = model.getClass("Car");
      let methods: Method[] = _carClass.getMethods();
      let param1: string = "";
      let param1Type: string = "";
      let param2: string = "";
      let param2Type: string = "";
      if (methods[0].hasParameters()) {
         let param: Parameter = methods[0].parameters[0];
         param1 = param.identifier.value;
         param1Type = param.type.value;
         param = methods[0].parameters[1];
         param2 = param.identifier.value;
         param2Type = param.type.value;
      }
      let paramsOK: boolean = param1 == "param1" && param1Type == "int" && param2 == "param2" && param2Type == "int";
      expect(model.existsClass("Car") && methods.length > 0 && methods[0].identifier.value == "run" && paramsOK).toBeTruthy();
   });

   it("Given a class with associations, when get its model, then its associations match with the input", () => {
      let model: Model = new ModelBuilder("class Car association Batery, Panel, Engine").build();
      let _carClass: Class = model.getClass("Car");
      let associations: Relation[] = _carClass.getAssociations();
      let _lastAssociation: Relation = associations[associations.length - 1];
      let _numClasses: number = _lastAssociation.getClasses().length - 1;
      let _lastClassName: string = _lastAssociation.getClasses()[_numClasses].name;
      expect(model.existsClass("Car") && _lastAssociation.getClasses().length == 3).toBeTruthy(); // && _lastClassName == "Engine").toBeTruthy();
   });

   it("Given a class with compositions, when get its model, then its model compositions match with the input", () => {
      let model: Model = new ModelBuilder("class Car composition Batery, Panel, Engine").build();
      let _carClass: Class = model.getClass("Car");
      let compositions: Relation[] = _carClass.getCompositions();
      let _lastComposition: Relation = compositions[compositions.length - 1];
      let _numClasses: number = _lastComposition.getClasses().length - 1;
      let _lastClassName: string = _lastComposition.getClasses()[_numClasses].name;
      expect(model.existsClass("Car") && _lastComposition.getClasses().length == 3).toBeTruthy(); // && _lastClassName == "Engine").toBeTruthy();
   });

   it("Given a class with uses, when get its model, then its model uses match with the input", () => {
      let model: Model = new ModelBuilder("class Car use Batery, Panel, Engine").build();
      let _carClass: Class = model.getClass("Car");
      let uses: Relation[] = _carClass.getUses();
      let _lastUse: Relation = uses[uses.length - 1];
      let _numClasses: number = _lastUse.getClasses().length - 1;
      let _lastClassName: string = _lastUse.getClasses()[_numClasses].name;
      expect(model.existsClass("Car") && _lastUse.getClasses().length == 3).toBeTruthy(); // && _lastClassName == "Engine").toBeTruthy();
   });
})
