"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarBuilder = void 0;
var Asociation_1 = require("./Asociation");
var Attribute_1 = require("./Attribute");
var Class_1 = require("./Class");
var Composition_1 = require("./Composition");
var Identifier_1 = require("./Identifier");
var Method_1 = require("./Method");
var Use_1 = require("./Use");
var GrammarBuilder = /** @class */ (function () {
    function GrammarBuilder(input) {
        this.classes = [];
        this.input = input;
        this.inputPointer = 0;
        this.clearSpaces();
    }
    GrammarBuilder.prototype.clearSpaces = function () {
        this.input = this.input.replace(/\s+/g, " ");
        this.input = this.input.replace(/\s*\(\s*/g, "(");
        this.input = this.input.replace(/\s*\)\s*/g, ") ");
        this.input = this.input.replace(/\s*,\s*/g, ",");
    };
    GrammarBuilder.prototype.getClasses = function () {
        return this.classes;
    };
    GrammarBuilder.prototype.build = function () {
        while (this.matchClassReservedWord()) {
            this.analyzeClass();
        }
    };
    GrammarBuilder.prototype.analyzeClass = function () {
        var _class = new Class_1.Class(this.getMatchedIdentifier());
        this.classes.push(_class);
        this.analyzeInherit(_class);
        this.analyzeAttributes(_class);
        this.analyzeMethods(_class);
        this.analyzeCompositions(_class);
        this.analyzeUses(_class);
        this.analyzeAssociations(_class);
    };
    GrammarBuilder.prototype.matchClassReservedWord = function () {
        return this.matchWord(/\s*class\s+/);
    };
    GrammarBuilder.prototype.matchWord = function (expReg) {
        var matchedWord = expReg.exec(this.input.substring(this.inputPointer));
        if (matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return matchedWord != null && matchedWord[0].length > 0;
    };
    GrammarBuilder.prototype.analyzeInherit = function (_class) {
        if (this.matchInheritReservedWord()) {
            do {
                var identifier = new Identifier_1.Identifier(this.getMatchedIdentifier());
                _class.addIdentifierInherit(identifier);
            } while (this.hasMoreIdentifiers());
        }
    };
    GrammarBuilder.prototype.matchInheritReservedWord = function () {
        return this.matchWord(/inherits\s+/);
    };
    GrammarBuilder.prototype.analyzeAttributes = function (_class) {
        if (this.matchedAttributeReservedWord()) {
            do {
                var attribute = new Attribute_1.Attribute();
                attribute.set(this.getMatchedIdentifier(), this.getMatchedType());
                _class.addAttribute(attribute);
            } while (this.hasMoreIdentifiers());
        }
    };
    GrammarBuilder.prototype.matchedAttributeReservedWord = function () {
        return this.matchWord(/attribute\s+/);
    };
    GrammarBuilder.prototype.getMatchedIdentifier = function () {
        var identifier = "";
        if (this.isIdentifier(this.input.substring(this.inputPointer))) {
            identifier = this.getIdentifier(this.input.substring(this.inputPointer));
            this.advanceInputPointer(identifier);
        }
        return identifier;
    };
    GrammarBuilder.prototype.getMatchedType = function () {
        return this.getMatchedIdentifier();
    };
    GrammarBuilder.prototype.isReservedWord = function () {
        return this.isClassReservedWord() || this.isAttributeReservedWord();
    };
    GrammarBuilder.prototype.isClassReservedWord = function () {
        return /\s*class\s+/.test(this.input.substring(this.inputPointer));
    };
    GrammarBuilder.prototype.isAttributeReservedWord = function () {
        return /attribute\s+/.test(this.input.substring(this.inputPointer));
    };
    GrammarBuilder.prototype.isIdentifier = function (identifier) {
        return /^[a-zA-Z_]+\s*/.test(identifier.trim());
    };
    GrammarBuilder.prototype.getIdentifier = function (identifier) {
        var matches = /^[a-zA-Z_]+\s*/.exec(identifier.trim());
        if (matches != null) {
            return matches[0];
        }
        return "";
    };
    GrammarBuilder.prototype.advanceInputPointer = function (_substring) {
        this.inputPointer += _substring.length;
    };
    GrammarBuilder.prototype.hasMoreIdentifiers = function () {
        var regExpComma = /^,/;
        var hasMoreAttr = regExpComma.test(this.input.substring(this.inputPointer));
        var matchedWord = regExpComma.exec(this.input.substring(this.inputPointer));
        if (hasMoreAttr && matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return hasMoreAttr;
    };
    GrammarBuilder.prototype.analyzeMethods = function (_class) {
        while (this.matchedMethodReservedWord()) {
            do {
                var method = new Method_1.Method();
                method.setIdentifier(this.getMatchedIdentifier());
                this.getMethodParams(method);
                _class.addMethod(method);
            } while (this.hasMoreIdentifiers());
        }
    };
    GrammarBuilder.prototype.matchedMethodReservedWord = function () {
        return this.matchWord(/^method\s+/);
    };
    GrammarBuilder.prototype.getMethodParams = function (method) {
        this.matchWord(/\(\s*/);
        do {
            method.addParameter(this.getMatchedIdentifier(), this.getMatchedType());
        } while (this.hasMoreIdentifiers());
        this.matchWord(/\s*\)\s+/);
    };
    GrammarBuilder.prototype.analyzeCompositions = function (_class) {
        if (this.matchedCompositionReservedWord()) {
            var composition = new Composition_1.Composition();
            do {
                composition.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addComposition(composition);
        }
    };
    GrammarBuilder.prototype.matchedCompositionReservedWord = function () {
        return this.matchWord(/^composition\s+/);
    };
    GrammarBuilder.prototype.analyzeUses = function (_class) {
        if (this.matchedUseReservedWord()) {
            var use = new Use_1.Use();
            do {
                use.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addUse(use);
        }
    };
    GrammarBuilder.prototype.matchedUseReservedWord = function () {
        return this.matchWord(/^use\s+/);
    };
    GrammarBuilder.prototype.analyzeAssociations = function (_class) {
        if (this.matchedAssociationsReservedWord()) {
            var asociation = new Asociation_1.Association();
            do {
                asociation.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addAsociation(asociation);
        }
    };
    GrammarBuilder.prototype.matchedAssociationsReservedWord = function () {
        return this.matchWord(/^association\s+/);
    };
    return GrammarBuilder;
}());
exports.GrammarBuilder = GrammarBuilder;
