"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagram = void 0;
var Diagram = /** @class */ (function () {
    function Diagram() {
        this._classes = [];
    }
    Diagram.prototype.addClass = function (_class) {
        this._classes.push(_class);
    };
    return Diagram;
}());
exports.Diagram = Diagram;
