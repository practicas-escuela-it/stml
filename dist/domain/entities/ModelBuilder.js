"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelBuilder = void 0;
var Asociation_1 = require("./Asociation");
var Attribute_1 = require("./Attribute");
var Composition_1 = require("./Composition");
var Method_1 = require("./Method");
var Use_1 = require("./Use");
var ClassBuilder_1 = require("./ClassBuilder");
var ModelBuilder = /** @class */ (function () {
    function ModelBuilder(input) {
        // this.classes = [];
        this.input = input;
        this.inputPointer = 0;
        this.clearSpaces();
    }
    ModelBuilder.prototype.clearSpaces = function () {
        this.input = this.input.replace(/\s+/g, " ");
        this.input = this.input.replace(/\s*\(\s*/g, "(");
        this.input = this.input.replace(/\s*\)\s*/g, ") ");
        this.input = this.input.replace(/\s*,\s*/g, ",");
    };
    ModelBuilder.prototype.getClasses = function () {
        // return this.classes;
        return ClassBuilder_1.ClassBuilder.getInstance().getAllClasses();
    };
    ModelBuilder.prototype.build = function () {
        while (this.matchClassReservedWord()) {
            this.analyzeClass();
        }
        return ClassBuilder_1.ClassBuilder.getInstance().getAllClasses();
    };
    ModelBuilder.prototype.analyzeClass = function () {
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
    ModelBuilder.prototype.matchClassReservedWord = function () {
        return this.matchWord(/\s*class\s+/);
    };
    ModelBuilder.prototype.matchWord = function (expReg) {
        var matchedWord = expReg.exec(this.input.substring(this.inputPointer));
        if (matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return matchedWord != null; //&& matchedWord[0].length > 0;
    };
    ModelBuilder.prototype.analyzeInherit = function (_class) {
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
    ModelBuilder.prototype.matchInheritReservedWord = function () {
        return this.matchWord(/inherits\s+/);
    };
    ModelBuilder.prototype.analyzeAttributes = function (_class) {
        if (this.matchedAttributeReservedWord()) {
            do {
                var attribute = new Attribute_1.Attribute();
                attribute.set(this.getMatchedIdentifier(), this.getMatchedType());
                _class.addAttribute(attribute);
            } while (this.hasMoreIdentifiers());
        }
    };
    ModelBuilder.prototype.matchedAttributeReservedWord = function () {
        return this.matchWord(/attribute\s+/);
    };
    ModelBuilder.prototype.getMatchedIdentifier = function () {
        var identifier = "";
        if (this.isIdentifier(this.input.substring(this.inputPointer))) {
            identifier = this.getIdentifier(this.input.substring(this.inputPointer));
            this.advanceInputPointer(identifier);
        }
        return identifier;
    };
    ModelBuilder.prototype.getMatchedType = function () {
        return this.getMatchedIdentifier();
    };
    ModelBuilder.prototype.isReservedWord = function () {
        return this.isClassReservedWord() || this.isAttributeReservedWord();
    };
    ModelBuilder.prototype.isClassReservedWord = function () {
        return /\s*class\s+/.test(this.input.substring(this.inputPointer));
    };
    ModelBuilder.prototype.isAttributeReservedWord = function () {
        return /attribute\s+/.test(this.input.substring(this.inputPointer));
    };
    ModelBuilder.prototype.isIdentifier = function (identifier) {
        return /^[a-zA-Z_]+\s*/.test(identifier.trim());
    };
    ModelBuilder.prototype.getIdentifier = function (identifier) {
        var matches = /^[a-zA-Z_]+\s*/.exec(identifier.trim());
        if (matches != null) {
            return matches[0];
        }
        return "";
    };
    ModelBuilder.prototype.advanceInputPointer = function (_substring) {
        this.inputPointer += _substring.length;
    };
    ModelBuilder.prototype.hasMoreIdentifiers = function () {
        var regExpComma = /^,/;
        var hasMoreAttr = regExpComma.test(this.input.substring(this.inputPointer));
        var matchedWord = regExpComma.exec(this.input.substring(this.inputPointer));
        if (hasMoreAttr && matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return hasMoreAttr;
    };
    ModelBuilder.prototype.analyzeMethods = function (_class) {
        while (this.matchedMethodReservedWord()) {
            do {
                var method = new Method_1.Method();
                method.setIdentifier(this.getMatchedIdentifier());
                this.getMethodParams(method);
                _class.addMethod(method);
            } while (this.hasMoreIdentifiers());
        }
    };
    ModelBuilder.prototype.matchedMethodReservedWord = function () {
        return this.matchWord(/^method\s+/);
    };
    ModelBuilder.prototype.getMethodParams = function (method) {
        this.matchWord(/\(\s*/);
        do {
            method.addParameter(this.getMatchedIdentifier(), this.getMatchedType());
        } while (this.hasMoreIdentifiers());
        this.matchWord(/\s*\)\s+/);
    };
    ModelBuilder.prototype.analyzeCompositions = function (_class) {
        if (this.matchedCompositionReservedWord()) {
            var composition = new Composition_1.Composition();
            do {
                composition.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addComposition(composition);
        }
    };
    ModelBuilder.prototype.matchedCompositionReservedWord = function () {
        return this.matchWord(/^composition\s+/);
    };
    ModelBuilder.prototype.analyzeUses = function (_class) {
        if (this.matchedUseReservedWord()) {
            var use = new Use_1.Use();
            do {
                use.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addUse(use);
        }
    };
    ModelBuilder.prototype.matchedUseReservedWord = function () {
        return this.matchWord(/^use\s+/);
    };
    ModelBuilder.prototype.analyzeAssociations = function (_class) {
        if (this.matchedAssociationsReservedWord()) {
            var asociation = new Asociation_1.Association();
            do {
                asociation.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addAsociation(asociation);
        }
    };
    ModelBuilder.prototype.matchedAssociationsReservedWord = function () {
        return this.matchWord(/^association\s+/);
    };
    return ModelBuilder;
}());
exports.ModelBuilder = ModelBuilder;
