class Type {
    constructor(input) {
        this.input = input;
        this.size = 0;
        this.value = "";
        this.TYPE = /^[a-zA-Z_]+\s*/;
    }

    analyze() {
        if (this.TYPE.test(this.input)) {
            let regExpExecArray = regExp.exec(this.input);
            this.size += regExpExecArray[0].length;
            this.value = regExpExecArray[0];
        }
    }

    getSize() {
        return this.size;
    }
}