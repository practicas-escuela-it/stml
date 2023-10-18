class Analizer {

    private attribute: Attribute;

    constructor() {
        this.attribute = new Attribute();
    }
    
    getAttribute(input: string) {
        let words = input.trim().split(' ');
       if  (words.length == 2
            && this.isIdentifier(words[0])
            && this.isIdentifier(words[1])) {

          this.attribute.set(this.getIdentifier(words[0]), this.getIdentifier(words[1]));
        }
    }

    private isIdentifier(identifier: string) {
       return /^[a-zA-Z_]+\s*/.test(identifier.trim());
    }

    private getIdentifier(identifier: string): string  {        
        let matches = /^[a-zA-Z_]+\s*/.exec(identifier.trim());        
        if (matches != null) {
            return matches[0];
        }
        return "";
    }
}