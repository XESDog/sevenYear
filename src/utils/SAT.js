"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
/**
 * 分离轴定理
 * @param polygonA
 * @param polygonB
 * @return {boolean}
 * @constructor
 */
exports.SAT = function (polygonA, polygonB) {
    return !(!itrPolygonEdge(polygonA, polygonB) || !itrPolygonEdge(polygonB, polygonA));
};
/**
 * 以polygon为参照物，依次获取polygon每一条边的法线跟otherPolygon做比较，返回是否相交
 * @param polygon
 * @param otherPolygon
 * @return {boolean}
 */
function itrPolygonEdge(polygon, otherPolygon) {
    var points = polygon.points;
    var normal = null;
    var v = new __1.Vector2(0, 0);
    var intersect = false;
    var projection = null;
    var otherProjection = null;
    for (var i = 0; i < points.length - 1; i = i + 2) {
        //挑选一条边，沿该边作法线
        if (i === points.length - 2) {
            //和第一个点组成的边
            v.set(points[0] - points[i], points[1] - points[i + 1]);
        }
        else {
            v.set(points[i + 2] - points[i], points[i + 3] - points[i + 1]);
        }
        normal = v.getNormal();
        projection = getPolygonProjection(polygon, normal);
        otherProjection = getPolygonProjection(otherPolygon, normal);
        var sort = projection.concat(otherProjection).sort(function (a, b) { return b - a; });
        var len = Math.abs(sort[3] - sort[0]);
        intersect = (Math.abs(projection[1] - projection[0]) + Math.abs(otherProjection[1] - otherProjection[0])) > len;
        //只要有一次不相交，则说明两个多边形不相交
        if (!intersect)
            return false;
    }
    return true;
}
/**
 * 多边形在矢量v上的投影
 * @param polygon
 * @param v
 * @return {number[]}
 */
function getPolygonProjection(polygon, v) {
    var j = 0;
    var projection = null;
    var aPoints = polygon.points;
    var min = null;
    var max = null;
    //多边形A在normal上的投影
    while (j < aPoints.length) {
        projection = v.getProjection(__1.Vector2.create(aPoints[j], aPoints[j + 1]));
        if (min === null)
            min = projection;
        if (max === null)
            max = projection;
        if (min > projection)
            min = projection;
        if (max < projection)
            max = projection;
        j += 2;
    }
    return [min, max];
}
//# sourceMappingURL=SAT.js.map