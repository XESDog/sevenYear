"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Circle = /** @class */ (function () {
    function Circle(x, y, radius) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (radius === void 0) { radius = 0; }
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.r2 = this.radius * this.radius;
    }
    Circle.prototype.area = function () {
        return Math.PI * this.r2;
    };
    Circle.prototype.contains = function (x, y) {
        var v = __1.Vector2.create(x, y).sub(__1.Vector2.create(this.x, this.y));
        return v.lengthSq() <= this.r2;
    };
    Circle.prototype.contains = function (p) {
        return false;
    };
    Circle.prototype.clone = function () {
        return new Circle(this.x, this.y, this.radius);
    };
    return Circle;
}());
exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map