"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelBuilder = void 0;
var Asociation_1 = require("../entities/Asociation");
var Attribute_1 = require("../entities/Attribute");
var Composition_1 = require("../entities/Composition");
var Method_1 = require("../entities/Method");
var Use_1 = require("../entities/Use");
var ClassManager_1 = require("./ClassManager");
var ModelBuilder = /** @class */ (function () {
    function ModelBuilder(input) {
        this.KEYWORD_CLASS = new RegExp(/\s*class\s+/);
        this.KEYWORD_INHERITS = new RegExp(/inherits\s+/);
        this.KEYWORD_ATTRIBUTE = new RegExp(/attribute\s+/);
        this.KEYWORD_METHOD = new RegExp(/^method\s+/);
        this.KEYWORD_COMPOSITION = new RegExp(/^composition\s+/);
        this.KEYWORD_USE = new RegExp(/^use\s+/);
        this.KEYWORD_ASSOCIATION = new RegExp(/^association\s+/);
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
    ModelBuilder.prototype.build = function () {
        while (this.matchWord(this.KEYWORD_CLASS)) {
            this.analyzeClass();
        }
        return ClassManager_1.ClassManager.getInstance().getAllClasses();
    };
    ModelBuilder.prototype.analyzeClass = function () {
        var _class = ClassManager_1.ClassManager.getInstance().getClass(this.getMatchedIdentifier());
        if (_class != undefined) {
            this.analyzeInherit(_class);
            this.analyzeAttributes(_class);
            this.analyzeMethods(_class);
            this.analyzeCompositions(_class);
            this.analyzeUses(_class);
            this.analyzeAssociations(_class);
        }
    };
    ModelBuilder.prototype.matchWord = function (expReg) {
        var matchedWord = expReg.exec(this.input.substring(this.inputPointer));
        if (matchedWord != null)
            this.inputPointer += matchedWord[0].length;
        return matchedWord != null; //&& matchedWord[0].length > 0;
    };
    ModelBuilder.prototype.analyzeInherit = function (_class) {
        if (this.matchWord(this.KEYWORD_INHERITS)) {
            do {
                var _classInherit = ClassManager_1.ClassManager.getInstance().getClass(this.getMatchedIdentifier());
                if (_classInherit != null) {
                    _class.addInherit(_classInherit);
                }
            } while (this.hasMoreIdentifiers());
        }
    };
    ModelBuilder.prototype.analyzeAttributes = function (_class) {
        if (this.matchWord(this.KEYWORD_ATTRIBUTE)) {
            do {
                var attribute = new Attribute_1.Attribute();
                attribute.set(this.getMatchedIdentifier(), this.getMatchedType());
                _class.addAttribute(attribute);
            } while (this.hasMoreIdentifiers());
        }
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
        while (this.matchWord(this.KEYWORD_METHOD)) {
            do {
                var method = new Method_1.Method();
                method.setIdentifier(this.getMatchedIdentifier());
                this.getMethodParams(method);
                _class.addMethod(method);
            } while (this.hasMoreIdentifiers());
        }
    };
    ModelBuilder.prototype.getMethodParams = function (method) {
        this.matchWord(/\(\s*/);
        do {
            method.addParameter(this.getMatchedIdentifier(), this.getMatchedType());
        } while (this.hasMoreIdentifiers());
        this.matchWord(/\s*\)\s+/);
    };
    ModelBuilder.prototype.analyzeCompositions = function (_class) {
        if (this.matchWord(this.KEYWORD_COMPOSITION)) {
            var composition = new Composition_1.Composition();
            do {
                composition.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addComposition(composition);
        }
    };
    ModelBuilder.prototype.analyzeUses = function (_class) {
        if (this.matchWord(this.KEYWORD_USE)) {
            var use = new Use_1.Use();
            do {
                use.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addUse(use);
        }
    };
    ModelBuilder.prototype.analyzeAssociations = function (_class) {
        if (this.matchWord(this.KEYWORD_ASSOCIATION)) {
            var asociation = new Asociation_1.Association();
            do {
                asociation.addIdentifier(this.getMatchedIdentifier());
            } while (this.hasMoreIdentifiers());
            _class.addAsociation(asociation);
        }
    };
    return ModelBuilder;
}());
exports.ModelBuilder = ModelBuilder;
