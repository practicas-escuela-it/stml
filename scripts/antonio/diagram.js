
class Attributes {
    constructor() {
        this.attributes = [];
    }

    

    // <attributes> ::= "attribute" <identifier> <type> [ "," <identifier> <type>]*
    attributes() {
        let attributesOK = this.attribute();
        if (attributesOK) {
            while (this.matchNextComma()) {
                attributesOK = attributesOK && this.identifier() && this.type();
            }           
        }
        return attributesOK;
    }

    matchNextComma() {
        let regExpComma = /,\s/;
        let hasMoreAttr = regExpComma.test(this.input.substring(this.textPointer));
        let regExpExecArray = regExpComma.exec(this.input.substring(this.textPointer));
        if (hasMoreAttr)
            this.textPointer += regExpExecArray[0].length;
        return hasMoreAttr;
    }
}

class Attribute {
    constructor(input) {
        this.size = 0;
        this.input = input;
        this.identifier = null;
        this.type = null;
        this.REGEXP = /^attribute\s+/
    }

    analyze() {
        if ((this.REGEXP).test(this.input)) {
            console.log("Reconociendo attributo")
            this.advanceToNextInputSubstring();
            this.identifier = new Identifier(this.getNextSubstring());
            this.identifier.analyze();
            this.size += this.identifier.getSize();
            this.type = new Type(this.getNextSubstring());
            this.type.analyze();
            this.size += this.type.getSize();
        }
    }

    getSize() {
        return this.size;
    }

    getNextSubstring() {
        return this.input.substring(this.size);
    }

    advanceToNextInputSubstring() {
        let regExpExecArray = (this.REGEXP).exec(this.input);
        this.size += regExpExecArray[0].length;
    }
}

class Identifier {

    constructor(input) {
        this.input = input;
        this.size = 0;
        this.value = "";
        this.IDENTIFIER = /^[a-zA-Z_]+\s*/;
    }

    analyze() {
        if (this.IDENTIFIER.test(this.input)) {
            let regExpExecArray = this.IDENTIFIER.exec(this.input);
            this.size += regExpExecArray[0].length;
            this.value = regExpExecArray[0];
            console.log("identificador matched")
        }
    }

    getValue() {
        return this.value;
    }

    getSize() {
        return this.size;
    }

}

class Type {
    constructor(input) {
        this.input = input;
        this.size = 0;
        this.value = "";
        this.TYPE = /^[a-zA-Z_]+\s*/;
    }

    analyze() {
        if (this.TYPE.test(this.input)) {
            let regExpExecArray = this.TYPE.exec(this.input);
            this.size += regExpExecArray[0].length;
            this.value = regExpExecArray[0];
            console.log("type matched")
        }
    }

    getValue() {
        return this.value;
    }

    getSize() {
        return this.size;
    }
}

class Diagram {
  
    constructor(input) {
       this.input = input;
       this.size = 0;
       this.attributes = [];
       this.clearSpaces()
    }

    clearSpaces() {
        this.input = this.input.replace(/\s+/g, " ");
        this.input = this.input.replace(/\s*,\s*/, ", ");
    }
   
    analyze() {        
       let attribute = new Attribute(this.input); 
       attribute.analyze();
       this.attributes.push(attribute);
       this.size += attribute.getSize();
       while (this.matchNextComma()) {
          let attribute = new Attribute(this.input.substring(this.size));
          attribute.analyze();
          this.attributes.push(attribute);
          this.size += attribute.getSize();
       }
    }

    matchNextComma() {
        let regExpComma = /,\s/;
        let hasMoreAttr = regExpComma.test(this.input.substring(this.size));
        let regExpExecArray = regExpComma.exec(this.input.substring(this.size));
        if (hasMoreAttr)
            this.size += regExpExecArray[0].length;
        return hasMoreAttr;
    }
}

let diagram = new Diagram("attribute wheel decimal ,    door \
int,  brake int ");
console.log(diagram.input)
diagram.analyze();
console.log("attributes test: ")
console.log(diagram)
console.log("identifier: " + diagram.attributes[0].identifier.getValue() + " type: " + diagram.attributes[0].type.getValue())