"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * | a | c | tx|
 * | b | d | ty|
 * | 0 | 0 | 1 |
 */
var __1 = require("..");
var Matrix = /** @class */ (function () {
    function Matrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
    //this * p
    Matrix.prototype.apply = function (p) {
        var p2 = new __1.Point();
        p2.x = (this.a * p.x) + (this.c * p.y) + this.tx;
        p2.y = (this.b * p.x) + (this.d * p.y) + this.ty;
        return p2;
    };
    //this * matrix
    Matrix.prototype.append = function (matrix) {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        this.a = (matrix.a * a1) + (matrix.b * c1);
        this.b = (matrix.a * b1) + (matrix.b * d1);
        this.c = (matrix.c * a1) + (matrix.d * c1);
        this.d = (matrix.c * b1) + (matrix.d * d1);
        this.tx = (matrix.tx * a1) + (matrix.ty * c1) + this.tx;
        this.ty = (matrix.tx * b1) + (matrix.ty * d1) + this.ty;
        return this;
    };
    //matrix * this
    Matrix.prototype.prepend = function (matrix) {
        var tx1 = this.tx;
        if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
            var a1 = this.a;
            var c1 = this.c;
            this.a = (a1 * matrix.a) + (this.b * matrix.c);
            this.b = (a1 * matrix.b) + (this.b * matrix.d);
            this.c = (c1 * matrix.a) + (this.d * matrix.c);
            this.d = (c1 * matrix.b) + (this.d * matrix.d);
        }
        this.tx = (tx1 * matrix.a) + (this.ty * matrix.c) + matrix.tx;
        this.ty = (tx1 * matrix.b) + (this.ty * matrix.d) + matrix.ty;
        return this;
    };
    Matrix.prototype.translate = function (x, y) {
        this.tx += x;
        this.ty += y;
        return this;
    };
    Matrix.prototype.scale = function (x, y) {
        this.a *= x;
        this.d *= y;
        this.c *= x;
        this.b *= y;
        this.tx *= x;
        this.ty *= y;
        return this;
    };
    Matrix.prototype.rotate = function (angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var a1 = this.a;
        var c1 = this.c;
        var tx1 = this.tx;
        this.a = (a1 * cos) - (this.b * sin);
        this.b = (a1 * sin) + (this.b * cos);
        this.c = (c1 * cos) - (this.d * sin);
        this.d = (c1 * sin) + (this.d * cos);
        this.tx = (tx1 * cos) - (this.ty * sin);
        this.ty = (tx1 * sin) + (this.ty * cos);
        return this;
    };
    //逆矩阵
    Matrix.prototype.invert = function () {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        var tx1 = this.tx;
        var n = (a1 * d1) - (b1 * c1);
        this.a = d1 / n;
        this.b = -b1 / n;
        this.c = -c1 / n;
        this.d = a1 / n;
        this.tx = ((c1 * this.ty) - (d1 * tx1)) / n;
        this.ty = -((a1 * this.ty) - (b1 * tx1)) / n;
        return this;
    };
    Matrix.prototype.identity = function () {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
        return this;
    };
    Matrix.prototype.clone = function () {
        var matrix = new Matrix();
        matrix.a = this.a;
        matrix.b = this.b;
        matrix.c = this.c;
        matrix.d = this.d;
        matrix.tx = this.tx;
        matrix.ty = this.ty;
        return matrix;
    };
    return Matrix;
}());
exports.Matrix = Matrix;
//# sourceMappingURL=Matrix.js.map