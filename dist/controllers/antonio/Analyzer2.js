"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analyzer2 = void 0;
var Asociation_1 = require("../../entities/Asociation");
var Attribute_1 = require("../../entities/Attribute");
var Class_1 = require("../../entities/Class");
var Composition_1 = require("../../entities/Composition");
var Identifier_1 = require("../../entities/Identifier");
var Method_1 = require("../../entities/Method");
var Use_1 = require("../../entities/Use");
var Analyzer2 = /** @class */ (function () {
    function Analyzer2(input) {
        this.classes = [];
        this.input = input;
        this.inputPointer = 0;
        this.clearSpaces();
    }
    Analyzer2.prototype.clearSpaces = function () {
        this.input = this.input.replace(/\s+/g, " ");
        this.input = this.input.replace(/\s*\(\s*/g, "(");
        this.input = this.input.replace(/\s*\)\s*/g, ") ");
        this.input = this.input.replace(/\s*,\s*/g, ",");
        console.log(this.input);
    };
    Analyzer2.prototype.getClasses = function () {
        return this.classes;
    };
    Analyzer2.prototype.analyze = function () {
        while (this.matchClassReservedWord()) {
            this.analyzeClass();
        }
    };
    Analyzer2.prototype.analyzeClass = function () {
        var _class = new Class_1.Class(this.getMatchedIdentifier());
        this.classes.push(_class);
        this.analyzeInherit(_class);
        this.analyzeAttributes(_class);
        this.analyzeMethods(_class);
        this.analyzeCompositions(_class);
        this.analyzeUses(_class);
        this.analyzeAssociations(_class);
    };
    Analyzer2.prototype.matchClassReservedWord = function () {
        return this.matchWord(/\s*class\s+/);
    };
    Analyzer2.prototype.matchWord = function (expReg) {
        var matchedWord = expReg.exec(this.input.substring(this.inputPointer));
        if (matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return matchedWord != null && matchedWord[0].length > 0;
    };
    Analyzer2.prototype.analyzeInherit = function (_class) {
        if (this.matchInheritReservedWord()) {
            do {
                var identifier = new Identifier_1.Identifier(this.getMatchedIdentifier());
                _class.addIdentifierInherit(identifier);
            } while (this.hasMoreIdentifiers());
        }
    };
    Analyzer2.prototype.matchInheritReservedWord = function () {
        return this.matchWord(/inherits\s+/);
    };
    Analyzer2.prototype.analyzeAttributes = function (_class) {
        if (this.matchedAttributeReservedWord()) {
            do {
                var attribute = new Attribute_1.Attribute();
                attribute.set(this.getMatchedIdentifier(), this.getMatchedType());
                _class.addAttribute(attribute);
            } while (this.hasMoreIdentifiers());
        }
    };
    Analyzer2.prototype.matchedAttributeReservedWord = function () {
        return this.matchWord(/attribute\s+/);
    };
    Analyzer2.prototype.getMatchedIdentifier = function () {
        var identifier = "";
        if (this.isIdentifier(this.input.substring(this.inputPointer))) {
            identifier = this.getIdentifier(this.input.substring(this.inputPointer));
            this.advanceInputPointer(identifier);
        }
        return identifier;
    };
    Analyzer2.prototype.getMatchedType = function () {
        return this.getMatchedIdentifier();
    };
    Analyzer2.prototype.isReservedWord = function () {
        return this.isClassReservedWord() || this.isAttributeReservedWord();
    };
    Analyzer2.prototype.isClassReservedWord = function () {
        return /\s*class\s+/.test(this.input.substring(this.inputPointer));
    };
    Analyzer2.prototype.isAttributeReservedWord = function () {
        return /attribute\s+/.test(this.input.substring(this.inputPointer));
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
    Analyzer2.prototype.hasMoreIdentifiers = function () {
        var regExpComma = /^,/;
        var hasMoreAttr = regExpComma.test(this.input.substring(this.inputPointer));
        var matchedWord = regExpComma.exec(this.input.substring(this.inputPointer));
        if (hasMoreAttr && matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return hasMoreAttr;
    };
    Analyzer2.prototype.analyzeMethods = function (_class) {
        while (this.matchedMethodReservedWord()) {
            do {
                var method = new Method_1.Method();
                method.setIdentifier(this.getMatchedIdentifier());
                this.getMethodParams(method);
                _class.addMethod(method);
            } while (this.hasMoreIdentifiers());
        }
    };
    Analyzer2.prototype.matchedMethodReservedWord = function () {
        return this.matchWord(/^method\s+/);
    };
    Analyzer2.prototype.getMethodParams = function (method) {
        this.matchWord(/\(\s*/);
        do {
            method.addParameter(this.getMatchedIdentifier(), this.getMatchedType());
        } while (this.hasMoreIdentifiers());
        this.matchWord(/\s*\)\s+/);
    };
    Analyzer2.prototype.analyzeCompositions = function (_class) {
        if (this.matchedCompositionReservedWord()) {
            var composition = new Composition_1.Composition();
            do {
                composition.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addComposition(composition);
        }
    };
    Analyzer2.prototype.matchedCompositionReservedWord = function () {
        return this.matchWord(/^composition\s+/);
    };
    Analyzer2.prototype.analyzeUses = function (_class) {
        if (this.matchedUseReservedWord()) {
            var use = new Use_1.Use();
            do {
                use.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addUse(use);
        }
    };
    Analyzer2.prototype.matchedUseReservedWord = function () {
        return this.matchWord(/^use\s+/);
    };
    Analyzer2.prototype.analyzeAssociations = function (_class) {
        if (this.matchedAssociationsReservedWord()) {
            var asociation = new Asociation_1.Association();
            do {
                asociation.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addAsociation(asociation);
        }
    };
    Analyzer2.prototype.matchedAssociationsReservedWord = function () {
        return this.matchWord(/^association\s+/);
    };
    return Analyzer2;
}());
exports.Analyzer2 = Analyzer2;
var analyzer = new Analyzer2(" class Car inherits Vehicle attribute isStarted bool,    \
             tipo int,    conTipo real   \
             method run (velocity real, aceleration ) \
             method stop() \
             composition Door, Roof \
             use Cylinder, Injector \
             association Batery, Panel \
             class Engine \
                 attribute piece real, bujia int \
                 composition DistributionRun, OilFilter \
                 use Piston \
                 association Batery \
             class Gas  \
                  attribute price real, amount real \
                  ");
//let analyzer: Analyzer2 = new Analyzer2("attribute wheel decimal ,    ,brake int ");
analyzer.analyze();
console.log(JSON.stringify(analyzer.getClasses()));
