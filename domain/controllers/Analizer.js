"use strict";
class Analizer {
    constructor() {
        this.attributes = [];
    }
    getAttribute(input) {
        let words = input.trim().split(' ');
        if (words.length == 2
            && this.isIdentifier(words[0])
            && this.isIdentifier(words[1])) {
            let attribute = new Attribute();
            attribute.set(this.getIdentifier(words[0]), this.getIdentifier(words[1]));
            this.attributes.push(attribute);
        }
    }
    isIdentifier(identifier) {
        return /^[a-zA-Z_]+\s*/.test(identifier.trim());
    }
    getIdentifier(identifier) {
        let matches = /^[a-zA-Z_]+\s*/.exec(identifier.trim());
        if (matches != null) {
            return matches[0];
        }
        return "";
    }
}
