import { Attribute } from "../entities/Attribute";
import { Class } from "../entities/Class";
import { Method } from "../entities/Method";
import { ClassManager } from "./ClassManager";
import { Model } from "../entities/Model";
import { Multiplicity } from "../entities/Multiplicity";
import { Relation } from "../entities/Relation";
import { Strings } from "../utils/strings";

export class ModelBuilder {

  private readonly KEYWORD_CLASS: RegExp = new RegExp(/\s*class\s+/);
  private readonly KEYWORD_INHERITS: RegExp = new RegExp(/^inherits\s+/);
  private readonly KEYWORD_ATTRIBUTE: RegExp = new RegExp(/^attribute\s+/);
  private readonly KEYWORD_METHOD: RegExp = new RegExp(/^method\s+/);
  private readonly KEYWORD_COMPOSITION: RegExp = new RegExp(/^composition\s+/);
  private readonly KEYWORD_USE: RegExp = new RegExp(/^use\s+/);
  private readonly KEYWORD_ASSOCIATION: RegExp = new RegExp(/^association\s+/);
  private readonly KEYWORD_PACKAGE: RegExp = new RegExp(/^\s*package\s+/);
  private input: string;
  private inputPointer: number;

  constructor(input: string) {
    // this.classes = [];
    this.input = input;
    this.inputPointer = 0;
    this.input = new Strings().clearSpaces(this.input);
    ClassManager.getInstance().clear();
  }

  build(): Model {
    while (this.matchWord(this.KEYWORD_PACKAGE)) {
      this._analyzePackage();
      while (this.matchWord(this.KEYWORD_CLASS)) {
         this.analyzeClass();
       }
    }
    return ClassManager.getInstance().getModel();
  }

  private _analyzePackage(): void {
    let identifier: string = this.getMatchedIdentifier();
    if (identifier != "") {
       ClassManager.getInstance().createPackage(identifier);
    }
  }

  private analyzeClass(): void {
    let _class: Class | undefined = ClassManager.getInstance().getClass(this.getMatchedIdentifier());
    if (_class != undefined) {
      this.analyzeInherit(_class);
      this.analyzeAttributes(_class);
      this.analyzeMethods(_class);
      this.analyzeCompositions(_class);
      this.analyzeUses(_class);
      this.analyzeAssociations(_class);
    }
  }

  private matchWord(expReg: RegExp): boolean {
    let matchedWord = expReg.exec(this.input.substring(this.inputPointer));
    if (matchedWord != null) {
      this.inputPointer += matchedWord[0].length;
    }
    return matchedWord != null;  //&& matchedWord[0].length > 0;
  }

  private analyzeInherit(_class: Class) {
    if (this.matchWord(this.KEYWORD_INHERITS)) {
      do {
        let _classInherit: Class | undefined = ClassManager.getInstance().getClass(this.getMatchedIdentifier());
        if (_classInherit != null) {
          _class.addInherit(_classInherit);
        }
      } while (this.hasMoreIdentifiers())
    }
  }

  private analyzeAttributes(_class: Class) {
    if (this.matchWord(this.KEYWORD_ATTRIBUTE)) {
      do {
        let attribute: Attribute = new Attribute();
        attribute.set(this.getMatchedIdentifier(), this.getMatchedType());
        _class.addAttribute(attribute);
      } while (this.hasMoreIdentifiers());
    }
  }

  private getMatchedIdentifier(): string {
    let identifier = "";
    if (this.isIdentifier(this.input.substring(this.inputPointer))) {
      identifier = this.getIdentifier(this.input.substring(this.inputPointer));
      this.advanceInputPointer(identifier);
    }
    return identifier;
  }

  private _getMatchedMultiplicity(): Multiplicity {
    let multiplicity: Multiplicity = new Multiplicity();
    if (/^\(\d,[\d|n]\)\s+/.test(this.input.substring(this.inputPointer))) {
      let matchedResult: RegExpExecArray | null = /^\((\d),([\d|n])\)\s+/.exec(this.input.substring(this.inputPointer));
      if (matchedResult != null) {
        multiplicity = new Multiplicity(matchedResult[1], matchedResult[2]);
        this.advanceInputPointer(matchedResult[0]);
      }
    }
    return multiplicity;
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
    return /^[a-zA-Z_0-9]+\s*/.test(identifier.trim());
  }

  private getIdentifier(identifier: string): string {
    let matches = /^[a-zA-Z_0-9]+\s*/.exec(identifier.trim());
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
    while (this.matchWord(this.KEYWORD_METHOD)) {
      do {
        let method: Method = new Method();
        method.setIdentifier(this.getMatchedIdentifier());
        this.getMethodParams(method);
        _class.addMethod(method);
      } while (this.hasMoreIdentifiers());
    }
  }

  getMethodParams(method: Method) {
    this.matchWord(/\(\s*/);
    do {
      method.addParameter(this.getMatchedIdentifier(), this.getMatchedType());
    } while (this.hasMoreIdentifiers());
    this.matchWord(/\s*\)\s+/);
  }

  private analyzeCompositions(_class: Class) {
    if (this.matchWord(this.KEYWORD_COMPOSITION)) {
      let composition: Relation = new Relation();
      do {
        let compositionClass: Class | undefined = ClassManager.getInstance().getClass(this.getMatchedIdentifier());
        if (compositionClass != null) {
          composition.addClass(compositionClass);
          let multiplicity: Multiplicity = this._getMatchedMultiplicity();
          if (multiplicity.isValid()) {
            composition.addMultiplicity(compositionClass?.name, multiplicity);
          }
        }
      } while (this.hasMoreIdentifiers());
      _class.addComposition(composition);
    }
  }

  private analyzeUses(_class: Class) {
    if (this.matchWord(this.KEYWORD_USE)) {
      let use: Relation = new Relation();
      do {
        let useClass: Class | undefined = ClassManager.getInstance().getClass(this.getMatchedIdentifier());
        if (useClass != null) {
          use.addClass(useClass);
          let multiplicity: Multiplicity = this._getMatchedMultiplicity();
          if (multiplicity.isValid()) {
            use.addMultiplicity(useClass?.name, multiplicity);
          }
        }
      } while (this.hasMoreIdentifiers());
      _class.addUse(use);
    }
  }

  private analyzeAssociations(_class: Class) {
    if (this.matchWord(this.KEYWORD_ASSOCIATION)) {
      let asociation: Relation = new Relation();
      do {
        let associationClass: Class | undefined = ClassManager.getInstance().getClass(this.getMatchedIdentifier());
        if (associationClass != null) {
          asociation.addClass(associationClass);
          let multiplicity: Multiplicity = this._getMatchedMultiplicity();
          if (multiplicity.isValid()) {
            asociation.addMultiplicity(associationClass?.name, multiplicity);
          }
        }
      } while (this.hasMoreIdentifiers());
      _class.addAsociation(asociation);
    }
  }
}
