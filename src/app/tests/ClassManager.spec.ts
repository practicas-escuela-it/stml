import { ClassManager } from "../domain/builders/ClassManager";
import { Class } from "../domain/entities/Class";

describe("ClassManager", () => {

    it("Given classManager, when we request a class from it, then it will return that class to us", () => {
        let classManager: ClassManager = ClassManager.getInstance();
        let _class: Class | undefined = classManager.getClass("Car");
        if (_class != null)
          expect(_class?.name == "Car").toBeTruthy();
        else
          expect(false);
    });

    it("Given empty classManager, when we request its instance, then it will have no classes", () => {
      let classManager: ClassManager = ClassManager.getInstance();
      ClassManager.getInstance().clear();
      expect(classManager.getAllClasses().hasClasses()).toBeFalsy();
   });
});
