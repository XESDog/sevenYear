"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Linear = /** @class */ (function () {
    function Linear(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    Object.defineProperty(Linear.prototype, "k", {
        get: function () {
            if (this.p1.y === this.p2.y)
                return 0;
            if (this.p1.x === this.p2.x)
                return Infinity;
            return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Linear.prototype, "b", {
        get: function () {
            var k = this.k;
            if (k === 0) {
                return this.p1.y;
            }
            else if (k === Infinity) {
                return null;
            }
            else {
                return this.p1.y - k * this.p1.x;
            }
        },
        enumerable: true,
        configurable: true
    });
    Linear.prototype.getY = function (x) {
        var k = this.k;
        if (k === 0) {
            return this.p1.y;
        }
        else if (k === Infinity) {
            return null;
        }
        else {
            return k * x + this.b;
        }
    };
    Linear.prototype.contains = function (p) {
        var v1 = __1.Vector2.create(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        var v2 = __1.Vector2.create(this.p2.x - p.x, this.p2.y - p.y);
        return v1.cross(v2) < 1e-10; //小于一定误差范围
    };
    return Linear;
}());
exports.Linear = Linear;
//# sourceMappingURL=Linear.js.map