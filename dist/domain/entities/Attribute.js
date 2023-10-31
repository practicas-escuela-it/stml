"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
var Identifier_1 = require("./Identifier");
var Attribute = /** @class */ (function () {
    function Attribute() {
        this._identifier = new Identifier_1.Identifier("");
        this._type = new Identifier_1.Identifier("");
    }
    Attribute.prototype.accept = function (visitor) {
        visitor.visitAttribute(this);
    };
    Attribute.prototype.set = function (identifier, type) {
        this._identifier = new Identifier_1.Identifier(identifier);
        this._type = new Identifier_1.Identifier(type);
    };
    return Attribute;
}());
exports.Attribute = Attribute;
