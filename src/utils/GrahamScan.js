"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ltl_1 = require("./ltl");
var toLeft_1 = require("./toLeft");
var __1 = require("..");
/**
 *
 * @param points
 * @return {Array}
 * @constructor
 */
function GrahamScan(points) {
    var sp = ltl_1.ltl(points);
    var s = [sp];
    var t = presorting(sp, points);
    s.push(t.shift());
    return itr(s, t);
}
exports.GrahamScan = GrahamScan;
function itr(s, t) {
    while (t.length > 0) {
        if (toLeft_1.toLeft(s[s.length - 2], s[s.length - 1], t[0]) > 0) {
            s.push(t.shift());
        }
        else {
            s.pop();
        }
    }
    var result = [];
    s.forEach(function (v) { return result.push(v.x, v.y); });
    return result;
}
exports.itr = itr;
/**
 * 预排序
 * @param sp
 * @param points
 * @return {Array}
 */
function presorting(sp, points) {
    var len = points.length;
    var result = [];
    sp = new __1.Point(sp.x, sp.y);
    for (var i = 0; i < len; i = i + 2) {
        var p = new __1.Point(points[i], points[i + 1]);
        if (sp.equal(p))
            continue; //不处理同一个点
        p['angle'] = Math.atan2(p.y - sp.y, p.x - sp.x);
        result.push(p);
    }
    result.sort(function (a, b) {
        return a.angle - b.angle;
    });
    return result;
}
exports.presorting = presorting;
//# sourceMappingURL=GrahamScan.js.map