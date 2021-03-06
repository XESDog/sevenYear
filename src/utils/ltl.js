"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
/**
 * lowest-then-leftmost
 * @param points
 * @return {Point}
 */
function ltl(points) {
    if (points.length < 6)
        throw new Error('不能少于三个顶点');
    var result = null;
    var len = points.length;
    var assignResult = function (arr) {
        result.x = arr[0];
        result.y = arr[1];
    };
    for (var i = 0; i < len; i = i + 2) {
        //初始化第一个点
        if (!result) {
            result = new __1.Point(points[0], points[1]);
            continue;
        }
        if (points[i] < result[1]) {
            assignResult(points.slice(i - 1, i + 1));
        }
        else if (points[i] === result[1]) {
            if (points[i - 1] < result[0]) {
                assignResult(points.slice(i - 1, i + 1));
            }
        }
    }
    return result;
}
exports.ltl = ltl;
//# sourceMappingURL=ltl.js.map