class Analysis {


    constructor(input) {
        this.set(input);
        this.REGEXP_IDENTIFIER = /^[a-zA-Z_]+\s*/;
        this.REGEXP_TYPE = /(int|decimal|string|date|bool)/;
    }

    set(input) {
        this.input = input;
        this.textPointer = 0;
        this.clearSpaces();
    }

    clearSpaces() {
        this.input = this.input.replace(/\s+/g, " ");
        this.input = this.input.replace(/\s*,\s*/, ", ");
    }

    type() {
        let regExp = this.REGEXP_TYPE;
        let regExpExecArray = regExp.exec(this.input.substring(this.textPointer));
        let result = regExp.test(this.input.substring(this.textPointer));
        this.textPointer += regExpExecArray[0].length;
        return result;
    }

    identifier() {
        let regExp = this.REGEXP_IDENTIFIER;
        let regExpExecArray = regExp.exec(this.input.substring(this.textPointer));
        let result = regExp.test(this.input.substring(this.textPointer));
        this.textPointer += regExpExecArray[0].length;
        return result;
    }

    // "attribute" <identifier> <type>
    attribute() {
        let regExp = /^attribute\s+/;
        let regExpExecArray = regExp.exec(this.input.substring(this.textPointer));
        let resultAttribute = regExp.test(this.input.substring(this.textPointer));
        this.textPointer += regExpExecArray[0].length;
        return resultAttribute && this.identifier() && this.type();
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

let testType = new Analysis("decimal");
console.log("Type test: " + testType.type());
testType.set("variable");
console.log("identifier test: " + testType.identifier())

testType.set("attribute \
  car decimal   ");
console.log("attribute test: " + testType.attribute());

testType.set("attribute wheel     decimal");
console.log("attributes test with a only attribute: " + testType.attributes());

testType.set("attribute wheel decimal ,    door \
   int,  brake int ")
console.log("attributes test: " + testType.attributes())