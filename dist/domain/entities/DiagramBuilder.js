"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramBuilder = void 0;
var Asociation_1 = require("./Asociation");
var Attribute_1 = require("./Attribute");
var Composition_1 = require("./Composition");
var Method_1 = require("./Method");
var Use_1 = require("./Use");
var ClassBuilder_1 = require("./ClassBuilder");
var DiagramBuilder = /** @class */ (function () {
    function DiagramBuilder(input) {
        // this.classes = [];
        this.input = input;
        this.inputPointer = 0;
        this.clearSpaces();
    }
    DiagramBuilder.prototype.clearSpaces = function () {
        this.input = this.input.replace(/\s+/g, " ");
        this.input = this.input.replace(/\s*\(\s*/g, "(");
        this.input = this.input.replace(/\s*\)\s*/g, ") ");
        this.input = this.input.replace(/\s*,\s*/g, ",");
    };
    DiagramBuilder.prototype.getClasses = function () {
        // return this.classes;
        return ClassBuilder_1.ClassBuilder.getInstance().getAllClasses();
    };
    DiagramBuilder.prototype.build = function () {
        while (this.matchClassReservedWord()) {
            this.analyzeClass();
        }
        return ClassBuilder_1.ClassBuilder.getInstance().getAllClasses();
    };
    DiagramBuilder.prototype.analyzeClass = function () {
        // let _class = new Class(this.getMatchedIdentifier());
        // this.classes.push(_class);
        var _class = ClassBuilder_1.ClassBuilder.getInstance().getClass(this.getMatchedIdentifier());
        if (_class != null) {
            this.analyzeInherit(_class);
            this.analyzeAttributes(_class);
            this.analyzeMethods(_class);
            this.analyzeCompositions(_class);
            this.analyzeUses(_class);
            this.analyzeAssociations(_class);
        }
    };
    DiagramBuilder.prototype.matchClassReservedWord = function () {
        return this.matchWord(/\s*class\s+/);
    };
    DiagramBuilder.prototype.matchWord = function (expReg) {
        var matchedWord = expReg.exec(this.input.substring(this.inputPointer));
        if (matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return matchedWord != null; //&& matchedWord[0].length > 0;
    };
    DiagramBuilder.prototype.analyzeInherit = function (_class) {
        if (this.matchInheritReservedWord()) {
            do {
                var _classInherit = ClassBuilder_1.ClassBuilder.getInstance().getClass(this.getMatchedIdentifier());
                //  let identifier: Identifier = new Identifier(this.getMatchedIdentifier());
                if (_classInherit != null) {
                    _class.addInherit(_classInherit);
                }
            } while (this.hasMoreIdentifiers());
        }
    };
    DiagramBuilder.prototype.matchInheritReservedWord = function () {
        return this.matchWord(/inherits\s+/);
    };
    DiagramBuilder.prototype.analyzeAttributes = function (_class) {
        if (this.matchedAttributeReservedWord()) {
            do {
                var attribute = new Attribute_1.Attribute();
                attribute.set(this.getMatchedIdentifier(), this.getMatchedType());
                _class.addAttribute(attribute);
            } while (this.hasMoreIdentifiers());
        }
    };
    DiagramBuilder.prototype.matchedAttributeReservedWord = function () {
        return this.matchWord(/attribute\s+/);
    };
    DiagramBuilder.prototype.getMatchedIdentifier = function () {
        var identifier = "";
        if (this.isIdentifier(this.input.substring(this.inputPointer))) {
            identifier = this.getIdentifier(this.input.substring(this.inputPointer));
            this.advanceInputPointer(identifier);
        }
        return identifier;
    };
    DiagramBuilder.prototype.getMatchedType = function () {
        return this.getMatchedIdentifier();
    };
    DiagramBuilder.prototype.isReservedWord = function () {
        return this.isClassReservedWord() || this.isAttributeReservedWord();
    };
    DiagramBuilder.prototype.isClassReservedWord = function () {
        return /\s*class\s+/.test(this.input.substring(this.inputPointer));
    };
    DiagramBuilder.prototype.isAttributeReservedWord = function () {
        return /attribute\s+/.test(this.input.substring(this.inputPointer));
    };
    DiagramBuilder.prototype.isIdentifier = function (identifier) {
        return /^[a-zA-Z_]+\s*/.test(identifier.trim());
    };
    DiagramBuilder.prototype.getIdentifier = function (identifier) {
        var matches = /^[a-zA-Z_]+\s*/.exec(identifier.trim());
        if (matches != null) {
            return matches[0];
        }
        return "";
    };
    DiagramBuilder.prototype.advanceInputPointer = function (_substring) {
        this.inputPointer += _substring.length;
    };
    DiagramBuilder.prototype.hasMoreIdentifiers = function () {
        var regExpComma = /^,/;
        var hasMoreAttr = regExpComma.test(this.input.substring(this.inputPointer));
        var matchedWord = regExpComma.exec(this.input.substring(this.inputPointer));
        if (hasMoreAttr && matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return hasMoreAttr;
    };
    DiagramBuilder.prototype.analyzeMethods = function (_class) {
        while (this.matchedMethodReservedWord()) {
            do {
                var method = new Method_1.Method();
                method.setIdentifier(this.getMatchedIdentifier());
                this.getMethodParams(method);
                _class.addMethod(method);
            } while (this.hasMoreIdentifiers());
        }
    };
    DiagramBuilder.prototype.matchedMethodReservedWord = function () {
        return this.matchWord(/^method\s+/);
    };
    DiagramBuilder.prototype.getMethodParams = function (method) {
        this.matchWord(/\(\s*/);
        do {
            method.addParameter(this.getMatchedIdentifier(), this.getMatchedType());
        } while (this.hasMoreIdentifiers());
        this.matchWord(/\s*\)\s+/);
    };
    DiagramBuilder.prototype.analyzeCompositions = function (_class) {
        if (this.matchedCompositionReservedWord()) {
            var composition = new Composition_1.Composition();
            do {
                composition.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addComposition(composition);
        }
    };
    DiagramBuilder.prototype.matchedCompositionReservedWord = function () {
        return this.matchWord(/^composition\s+/);
    };
    DiagramBuilder.prototype.analyzeUses = function (_class) {
        if (this.matchedUseReservedWord()) {
            var use = new Use_1.Use();
            do {
                use.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addUse(use);
        }
    };
    DiagramBuilder.prototype.matchedUseReservedWord = function () {
        return this.matchWord(/^use\s+/);
    };
    DiagramBuilder.prototype.analyzeAssociations = function (_class) {
        if (this.matchedAssociationsReservedWord()) {
            var asociation = new Asociation_1.Association();
            do {
                asociation.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addAsociation(asociation);
        }
    };
    DiagramBuilder.prototype.matchedAssociationsReservedWord = function () {
        return this.matchWord(/^association\s+/);
    };
    return DiagramBuilder;
}());
exports.DiagramBuilder = DiagramBuilder;
