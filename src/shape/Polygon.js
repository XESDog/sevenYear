"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Polygon = /** @class */ (function () {
    /**
     *
     * @param points
     */
    function Polygon(points) {
        if (points.length < 6)
            throw new Error('多边形最少需要3个顶点');
        if (points.length % 2 !== 0)
            throw new Error('多边形参数需要偶数个Number');
        this.rawPoints = points;
        this.points = [];
        var len = this.rawPoints.length;
        for (var i = 0; i < len; i += 2) {
            this.points.push(new __1.Point(this.rawPoints[i], this.rawPoints[i + 1]));
        }
    }
    Polygon.prototype.contains = function (x, y) {
        console.log(x, y);
        var inside = false;
        var len = this.points.length;
        //使用射线法判断点是否在多边形内，引一条射线，如果有基数个交点则在多边形内，偶数了交点则在多边形外
        var a, b;
        for (var i = 0, j = len - 1; i < len; j = i++) {
            a = this.points[j];
            b = this.points[i];
            var xi = a.x;
            var yi = a.y;
            var xj = b.x;
            var yj = b.y;
            var intersect = ((yi > y) !== (yj > y)) //是否在y的上下两侧
                && (x < ((xj - xi) * ((y - yi) / (yj - yi))) + xi); //直线方程两点式，线段与平行于x轴的射线之间的交点大于目标点x
            if (intersect) {
                inside = !inside;
            }
        }
        return inside;
    };
    /**
     * 解法：任意一条边无线延伸，其他的点均在这条边的一侧，称为凸多边形
     * @return {boolean}
     */
    Polygon.prototype.isConvex = function () {
        var len = this.points.length;
        var a, b, c;
        for (var i = 0, j = len - 1; i < len; j = i++) {
            a = this.points[j];
            b = this.points[i];
            for (var k = 0; k < len; k++) {
                c = this.points[k];
                if (c.equal(a) || c.equal(b))
                    continue;
                if (__1.toLeft(a, b, c) < 0)
                    return false;
            }
        }
        return true;
    };
    Polygon.prototype.clone = function () {
        return new Polygon(this.rawPoints.concat());
    };
    return Polygon;
}());
exports.Polygon = Polygon;
//# sourceMappingURL=Polygon.js.map