"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.create = function (x, y) {
        return new Vector2(x, y);
    };
    Vector2.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Vector2.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    Vector2.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    Vector2.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vector2.prototype.cross = function (v) {
        return this.x * v.y - this.y * v.x;
    };
    Vector2.prototype.lerp = function (v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    };
    Vector2.prototype.normalize = function () {
        var length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    };
    /**
     * 法线
     * @return {Vector2}
     */
    Vector2.prototype.getNormal = function () {
        return new Vector2(this.y, -this.x);
    };
    /**
     * 矢量v在当前矢量上的投影
     * @param v
     * @return {number}
     */
    Vector2.prototype.getProjection = function (v) {
        return this.dot(v) / this.length();
    };
    Vector2.prototype.equal = function (v) {
        return this.x === v.x && this.y === v.y;
    };
    Vector2.prototype.lengthSq = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vector2.prototype.length = function () {
        return Math.sqrt(this.lengthSq());
    };
    Vector2.prototype.angle = function () {
        var angle = Math.atan2(this.y, this.x);
        if (angle < 0)
            angle += Math.PI * 2;
        return angle;
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
//# sourceMappingURL=Vector2.js.map