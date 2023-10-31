"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = void 0;
var Identifier = /** @class */ (function () {
    function Identifier(value) {
        this._value = value.trim();
    }
    Identifier.prototype.accept = function (visitor) {
        visitor.visitIdentifier(this);
    };
    Object.defineProperty(Identifier.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    return Identifier;
}());
exports.Identifier = Identifier;
