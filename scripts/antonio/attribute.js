class Attribute {
    constructor(input) {
        this.size = 0;
        this.input = input;
        this.identifier = null;
        this.type = null;
    }

    analyze() {
        if ((/attribute\s+/).test(this.input)) {
            console.log("Analizando attribute")
            this.advanceToNextInputSubstring();
            this.identifier = new Identifier(this.getNextSubstring());
            this.identifier.analyze();
            this.size += this.identifier.getSize();
            this.type = new Type(this.getNextSubstring());
            this.type.analyze();
            this.size += this.type.getSize();
        } else {
            console.log("No se reconoce attributo")
        }
    }

    getNextSubstring() {
        return this.input.substring(this.size);
    }

    advanceToNextInputSubstring() {
        let regExpExecArray = regExp.exec(this.input);
        this.size += regExpExecArray[0].length;
    }
}
