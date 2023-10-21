class Identifier {

    constructor(input) {
        this.input = input;
        this.size = 0;
        this.value = "";
        this.IDENTIFIER = /^[a-zA-Z_]+\s*/;
    }

    analyze() {
        if (this.IDENTIFIER.test(this.input)) {            
            let regExpExecArray = regExp.exec(this.input);
            this.size += regExpExecArray[0].length;
            this.value = regExpExecArray[0];
            console.log("Identifier matched " + this.value)
        }
    }

    getSize() {
        return this.size;
    }

}