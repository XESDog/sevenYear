"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exponent = /** @class */ (function () {
    function Exponent(a) {
        this.a = a;
    }
    Exponent.prototype.getY = function (x) {
        return Math.pow(this.a, x);
    };
    return Exponent;
}());
exports.Exponent = Exponent;
//# sourceMappingURL=Exponent.js.map