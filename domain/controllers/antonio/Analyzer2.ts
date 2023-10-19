import { Attribute } from "../../entities/Attribute";

export class Analyzer2 {

    private attributes: Attribute[];    
    private input: string;
    private inputPointer: number;

    constructor(input: string) {
        this.attributes = [];
        this.input = input;      
        this.inputPointer = 0;  
        this.clearSpaces();
    }

    private clearSpaces() {
        this.input = this.input.replace(/\s+/g, " ");
        this.input = this.input.replace(/\s*,\s*/, ", ");
    }

    analyzeAttributes() {        
        if (this.matchedAttributeWord()) {                      
            do {
               let attribute: Attribute  = new Attribute();                          
               attribute.set(this.matchIdentifier(), this.matchType());
               this.attributes.push(attribute);
            } while (this.hasMoreAttributes());
        }        
    }

    getAttributesNode(): Attribute[] {
        return this.attributes;
    }

    private matchedAttributeWord(): boolean {               
        let matchedWord = /^attribute\s+/.exec(this.input.substring(this.inputPointer));        
        if (matchedWord != null)
          this.inputPointer += matchedWord[0].length;        
        return matchedWord != null && matchedWord[0].length > 0;
    }
    
    private matchIdentifier(): string {
        let identifier = "";
        if (this.isIdentifier(this.input.substring(this.inputPointer))) {
            identifier = this.getIdentifier(this.input.substring(this.inputPointer));
            this.advanceInputPointer(identifier);
         }   
         return identifier;
    }

    private matchType(): string {
        return this.matchIdentifier();
    }    

    private isIdentifier(identifier: string): boolean {
        return /^[a-zA-Z_]+\s*/.test(identifier.trim());
     }
 
     private getIdentifier(identifier: string): string  {        
         let matches = /^[a-zA-Z_]+\s*/.exec(identifier.trim());        
         if (matches != null) {
             return matches[0];
         }
         return "";
     }

     private advanceInputPointer(_substring: string) {
        this.inputPointer += _substring.length;
     }

     private hasMoreAttributes(): boolean {
        let regExpComma = /,\s/;
        let hasMoreAttr = regExpComma.test(this.input.substring(this.inputPointer));
        let matchedWord = regExpComma.exec(this.input.substring(this.inputPointer));
        if (hasMoreAttr && matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return hasMoreAttr;
    }
}

let analyzer: Analyzer2 = new Analyzer2("attribute wheel decimal ,    door \
   int,  brake int ");

//let analyzer: Analyzer2 = new Analyzer2("attribute wheel decimal ,    ,brake int ");

analyzer.analyzeAttributes();
console.log(analyzer.getAttributesNode());