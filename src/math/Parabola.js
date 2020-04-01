"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parabola = /** @class */ (function () {
    function Parabola(a, b, c) {
        if (a === 0)
            throw new Error('二次函数系数a不能为0');
        this.a = a;
        this.b = b;
        this.c = c;
    }
    Object.defineProperty(Parabola.prototype, "axisSymmetry", {
        /**
         * 对称轴
         * @return {number}
         */
        get: function () {
            return -this.b / 2 * this.a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parabola.prototype, "intercept", {
        /**
         * 截距
         * @return {number}
         */
        get: function () {
            return this.c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parabola.prototype, "intersections", {
        /**
         * 交点
         * @return {null|number[]}
         */
        get: function () {
            var d = this.b * this.b - 4 * this.a * this.c;
            if (d < 0)
                return null;
            if (d === 0)
                return [this.axisSymmetry];
            if (d > 0) {
                var dd = Math.sqrt(d) / 2 * this.a;
                return [this.axisSymmetry + dd, this.axisSymmetry - dd];
            }
        },
        enumerable: true,
        configurable: true
    });
    Parabola.prototype.getY = function (x) {
        return this.a * x * x + this.b * x + this.c;
    };
    return Parabola;
}());
exports.Parabola = Parabola;
//# sourceMappingURL=Parabola.js.map