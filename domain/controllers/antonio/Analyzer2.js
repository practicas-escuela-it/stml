"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analyzer2 = void 0;
var Attribute_1 = require("../../entities/Attribute");
var Analyzer2 = /** @class */ (function () {
    function Analyzer2(input) {
        this.attributes = [];
        this.input = input;
        this.inputPointer = 0;
        this.clearSpaces();
    }
    Analyzer2.prototype.clearSpaces = function () {
        this.input = this.input.replace(/\s+/g, " ");
        this.input = this.input.replace(/\s*,\s*/, ", ");
    };
    Analyzer2.prototype.analyzeAttributes = function () {
        if (this.matchedAttributeWord()) {
            do {
                var attribute = new Attribute_1.Attribute();
                attribute.set(this.matchIdentifier(), this.matchType());
                this.attributes.push(attribute);
            } while (this.hasMoreAttributes());
        }
    };
    Analyzer2.prototype.getAttributesNode = function () {
        return this.attributes;
    };
    Analyzer2.prototype.matchedAttributeWord = function () {
        var matchedWord = /^attribute\s+/.exec(this.input.substring(this.inputPointer));
        if (matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return matchedWord != null && matchedWord[0].length > 0;
    };
    Analyzer2.prototype.matchIdentifier = function () {
        var identifier = "";
        if (this.isIdentifier(this.input.substring(this.inputPointer))) {
            identifier = this.getIdentifier(this.input.substring(this.inputPointer));
            this.advanceInputPointer(identifier);
        }
        return identifier;
    };
    Analyzer2.prototype.matchType = function () {
        return this.matchIdentifier();
    };
    Analyzer2.prototype.isIdentifier = function (identifier) {
        return /^[a-zA-Z_]+\s*/.test(identifier.trim());
    };
    Analyzer2.prototype.getIdentifier = function (identifier) {
        var matches = /^[a-zA-Z_]+\s*/.exec(identifier.trim());
        if (matches != null) {
            return matches[0];
        }
        return "";
    };
    Analyzer2.prototype.advanceInputPointer = function (_substring) {
        this.inputPointer += _substring.length;
    };
    Analyzer2.prototype.hasMoreAttributes = function () {
        var regExpComma = /,\s/;
        var hasMoreAttr = regExpComma.test(this.input.substring(this.inputPointer));
        var matchedWord = regExpComma.exec(this.input.substring(this.inputPointer));
        if (hasMoreAttr && matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return hasMoreAttr;
    };
    return Analyzer2;
}());
exports.Analyzer2 = Analyzer2;
var analyzer = new Analyzer2("attribute wheel decimal ,    door \
   int,  brake int ");
//let analyzer: Analyzer2 = new Analyzer2("attribute wheel decimal ,    ,brake int ");
analyzer.analyzeAttributes();
console.log(analyzer.getAttributesNode());
