"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Jarvis Match算法————从给定点集合中生成凸包
 * @param points
 * @constructor
 */
var toLeft_1 = require("./toLeft");
var ltl_1 = require("./ltl");
var __1 = require("..");
function JarvisMatch(points) {
    if (points.length < 6)
        throw new Error('不能少于三个顶点');
    var a = ltl_1.ltl(points);
    var r = [];
    var result = [];
    var ex = a;
    do {
        r.push(ex);
        ex = getExtremity(ex, points);
    } while (!ex.equal(a));
    r.forEach(function (v) { return result.push(v.x, v.y); });
    return result;
}
exports.JarvisMatch = JarvisMatch;
/**
 * 根据一个极点a和点的集合，获取逆时针方向的下一个极点
 * @param ex
 * @param points
 * @return {Point}
 */
function getExtremity(ex, points) {
    var len = points.length;
    for (var i = 0; i < len; i = i + 2) {
        var b = new __1.Point(points[i], points[i + 1]);
        var extremity = true; //是否极点
        if (ex.equal(b))
            continue;
        for (var j = 0; j < len; j = j + 2) {
            var c = new __1.Point(points[j], points[j + 1]);
            if (ex.equal(c))
                continue;
            if (b.equal(c))
                continue;
            if (toLeft_1.toLeft(ex, b, c) <= 0) {
                extremity = false;
                break;
            }
        }
        if (extremity)
            return b;
    }
    return null;
}
exports.getExtremity = getExtremity;
//# sourceMappingURL=JarvisMatch.js.map