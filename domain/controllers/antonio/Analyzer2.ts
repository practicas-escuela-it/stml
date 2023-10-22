import { Attribute } from "../../entities/Attribute";
import { Class } from "../../entities/Class";
import { Composition } from "../../entities/Composition";
import { Identifier } from "../../entities/Identifier";
import { Method } from "../../entities/Method";
import { Parameter } from "../../entities/Parameter";

export class Analyzer2 {

    private classes: Class[];
    private input: string;
    private inputPointer: number;

    constructor(input: string) {
        this.classes = [];
        this.input = input;
        this.inputPointer = 0;
        this.clearSpaces();
    }

    private clearSpaces() {
        this.input = this.input.replace(/\s+/g, " ");        
        this.input = this.input.replace(/\s*\(\s*/g, "(");
        this.input = this.input.replace(/\s*\)\s*/g, ") ");
        this.input = this.input.replace(/\s*,\s*/g, ",");
        console.log(this.input);
    }

    getClasses(): Class[] {
        return this.classes;
    }

    analyze(): void {
        while (this.matchClassReservedWord()) {
            this.analyzeClass();
        }
    }

    private analyzeClass(): void {
        let _class = new Class(this.getMatchedIdentifier());
        this.classes.push(_class);
        this.analyzeInherit(_class);
        this.analyzeAttributes(_class);
        this.analyzeMethods(_class);
    }

    private matchClassReservedWord(): boolean {
        return this.matchWord(/\s*class\s+/);
    }

    private matchWord(expReg: RegExp): boolean {
        let matchedWord = expReg.exec(this.input.substring(this.inputPointer));
        if (matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return matchedWord != null && matchedWord[0].length > 0;
    }

    private analyzeInherit(_class: Class) {
        if (this.matchInheritReservedWord()) {
           do {
            let identifier: Identifier = new Identifier(this.getMatchedIdentifier());
            _class.addIdentifierInherit(identifier);
           } while (this.hasMoreIdentifiers())
        }
    }
    
    private matchInheritReservedWord(): boolean {
       return this.matchWord(/inherits\s+/);
    }

    private analyzeAttributes(_class: Class) {
        if (this.matchedAttributeReservedWord()) {
            do {
                let attribute: Attribute = new Attribute();
                attribute.set(this.getMatchedIdentifier(), this.getMatchedType());
                _class.addAttribute(attribute);
            } while (this.hasMoreIdentifiers());
        }
    }

    private matchedAttributeReservedWord(): boolean {
        return this.matchWord(/attribute\s+/);
    }

    private getMatchedIdentifier(): string {
        let identifier = "";
        if (this.isIdentifier(this.input.substring(this.inputPointer))) {
            identifier = this.getIdentifier(this.input.substring(this.inputPointer));
            this.advanceInputPointer(identifier);
        }
        return identifier;
    }

    private getMatchedType(): string {      
        return this.getMatchedIdentifier();       
    }

    private isReservedWord(): boolean {
        return this.isClassReservedWord() || this.isAttributeReservedWord();
    }

    private isClassReservedWord(): boolean {
        return /\s*class\s+/.test(this.input.substring(this.inputPointer));
    }

    private isAttributeReservedWord(): boolean {
        return /attribute\s+/.test(this.input.substring(this.inputPointer));
    }   

    private isIdentifier(identifier: string): boolean {
        return /^[a-zA-Z_]+\s*/.test(identifier.trim());
    }

    private getIdentifier(identifier: string): string {
        let matches = /^[a-zA-Z_]+\s*/.exec(identifier.trim());
        if (matches != null) {
            return matches[0];
        }
        return "";
    }

    private advanceInputPointer(_substring: string) {
        this.inputPointer += _substring.length;
    }

    private hasMoreIdentifiers(): boolean {
        let regExpComma = /^,/;
        let hasMoreAttr = regExpComma.test(this.input.substring(this.inputPointer));
        let matchedWord = regExpComma.exec(this.input.substring(this.inputPointer));        
        if (hasMoreAttr && matchedWord != null)
            this.inputPointer += matchedWord[0].length;        
        return hasMoreAttr;
    }

    private analyzeMethods(_class: Class) {
        while (this.matchedMethodReservedWord()) {
            do {
                let method: Method = new Method();
                method.setIdentifier(this.getMatchedIdentifier());
                this.getMethodParams(method);
                _class.addMethod(method);
            } while (this.hasMoreIdentifiers());
        }
    }

    private matchedMethodReservedWord(): boolean {
        return this.matchWord(/method\s+/);
    }

    getMethodParams(method: Method) {
       this.matchWord(/\(\s*/);
       do {                       
          method.addParameter(this.getMatchedIdentifier(), this.getMatchedType());                       
       } while (this.hasMoreIdentifiers());       
       this.matchWord(/\s*\)\s+/);
    }

    private analyzeCompositions(_class: Class) {
        while (this.matchedCompositionReservedWord()) {
            let composition: Composition = new Composition();
            do {              
               composition.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addComposition(composition);
        }
    }
    
    private matchedCompositionReservedWord(): boolean {
        return this.matchWord(/composition\s+/);
    }
}

let analyzer: Analyzer2 = new Analyzer2(" class Car inherits Vehicle attribute isStarted bool,    \
             tipo int,    conTipo real   \
             method run (velocity real, aceleration ) \
             method stop() \
             class Engine \
                 attribute piece real, bujia int \
             class Gas  \
                  attribute price real, amount real \
                  ");

//let analyzer: Analyzer2 = new Analyzer2("attribute wheel decimal ,    ,brake int ");

analyzer.analyze();
console.log(JSON.stringify(analyzer.getClasses()));

