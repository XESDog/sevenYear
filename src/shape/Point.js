"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.toVector2 = function () {
        return new __1.Vector2(this.x, this.y);
    };
    Point.prototype.equal = function (p) {
        return this.x === p.x && this.y === p.y;
    };
    return Point;
}());
exports.Point = Point;
//# sourceMappingURL=Point.js.map