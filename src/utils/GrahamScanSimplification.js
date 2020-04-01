"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GrahamScan_1 = require("./GrahamScan");
var __1 = require("..");
/**
 * 按照x轴从大到小排序
 * @param points
 * @return {Array}
 */
function presorting(points) {
    var len = points.length;
    var result = [];
    for (var i = 0; i < len; i += 2) {
        result.push(new __1.Point(points[i], points[i + 1]));
    }
    result.sort(function (a, b) { return b.x - a.x; });
    return result;
}
function GrahamScanSimplification(points) {
    var sp = new __1.Point(0, Number.MIN_VALUE);
    var s = [sp];
    var sortedPoints = presorting(points);
    var t = sortedPoints.concat();
    s.push(t.shift());
    var upperHull = GrahamScan_1.itr(s, t);
    s = [new __1.Point(0, Number.MAX_VALUE)];
    t = sortedPoints.reverse();
    s.push(t.shift());
    var lowerHull = GrahamScan_1.itr(s, t);
    //将最小值和重复的顶点删除
    return __spreadArrays(upperHull.slice(4), lowerHull.slice(4));
}
exports.GrahamScanSimplification = GrahamScanSimplification;
//# sourceMappingURL=GrahamScanSimplification.js.map