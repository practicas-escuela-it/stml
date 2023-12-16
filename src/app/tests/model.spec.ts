import { Attribute } from "../domain/entities/Attribute";
import { Class } from "../domain/entities/Class";
import { Method } from "../domain/entities/Method";
import { Model } from "../domain/entities/Model";

describe("Model", () => {
    it("Given an empty model, when checking to see if it has classes, it should return false", () => {
       let model: Model = new Model()
       expect(model.hasClasses()).toBeFalsy();
    });

    it("Given a model to which a class is added, when checking to see if it has classes, it should return true", () => {
        let model: Model = new Model();
        model.addClass(new Class("Clase1"));
        expect(model.hasClasses()).toBeTruthy();
    });

    it("Given a model to which a class is added, when checking to see if it has that class, it should return true", () => {
        let model: Model = new Model();
        model.addClass(new Class("Clase1"));        
        expect(model.existsClass("Clase1")).toBeTruthy();
    });

    it("Given a model to which three classes are added, when the size is queried, it should return three", () => {
        let model: Model = new Model();
        model.addClass(new Class("Clase1"));        
        model.addClass(new Class("Clase2"));        
        model.addClass(new Class("Clase3"));             
        expect(model.getClasses().length == 3).toBeTruthy();
    });

    it("Given a model with a class, when said class is requested by name, it returns the instance of said class", () => {
       let model: Model = new Model();
       model.addClass(new Class("Clase1"));         
       let _class1: Class = model.getClass("Clase1");
       expect(_class1 != null).toBeTruthy();
    });

    it("Given a model with a class, when a non-existent class is requested, it returns null", () => {
        let model: Model = new Model();
        model.addClass(new Class("Clase1"));         
        let _class1: Class = model.getClass("clase1");
        expect(_class1 == null).toBeTruthy();
     });

     it("Given a model with a class, when you request to delete said class, then the model will be empty", () => {
        let model: Model = new Model();
        model.addClass(new Class("Clase1"));  
        model.removeClass(model.getClass("Clase1"));
        expect(model.hasClasses()).toBeFalsy();
     });

     it("Given a model with three classes, when you request to delete one by one, then the model will be empty", () => {
        let model: Model = new Model();
        model.addClass(new Class("Clase1"));  
        model.addClass(new Class("Clase2"));        
        model.addClass(new Class("Clase3"));              
        model.removeClass(model.getClass("Clase1"));
        model.removeClass(model.getClass("Clase2"));
        model.removeClass(model.getClass("Clase3"));
        expect(model.hasClasses()).toBeFalsy();        
     });

     it("Given a model with three classes, when you request to delete one by one, then the model will be empty", () => {
        let model: Model = new Model();
        model.addClass(new Class("Clase1"));  
        model.addClass(new Class("Clase2"));        
        model.addClass(new Class("Clase3"));    
        model.removeClasses([model.getClass("Clase1"), model.getClass("Clase2"), model.getClass("Clase3")]);
        expect(model.hasClasses()).toBeFalsy();        
     });

     it("Given a model, when another model copies the first one, then they should have the same data", () => {
        let model1: Model = new Model();
        let _class1: Class = new Class("Clase1");
        let attribute1 = new Attribute();
        attribute1.set("atributo1", "int");
        _class1.addAttribute(attribute1);
        let method1 = new Method();
        method1.setIdentifier("method1");
        method1.addParameter("param1", "int");
        _class1.addMethod(method1);
        model1.addClass(_class1);

        let model2: Model = new Model();
        model2.copy(model1);
        expect(model2.existsClass("Clase1")).toBeTruthy();
        let _classCopy: Class = model2.getClass("Clase1");
        expect(_classCopy.name == _class1.name).toBeTruthy();
     });
     
});