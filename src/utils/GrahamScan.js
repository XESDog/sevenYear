import {ltl} from "./ltl";
import {toLeft} from "./toLeft";
import {Point} from "..";

/**
 *
 * @param points
 * @return {Array}
 * @constructor
 */
export function GrahamScan(points) {
    let sp = ltl(points);
    let s = [sp];
    let t = presorting(sp, points);
    s.push(t.shift());

    while (t.length > 0) {
        if (toLeft(s[s.length - 2], s[s.length - 1], t[0]) > 0) {
            s.push(t.shift());
        } else {
            s.pop();
        }
    }
    let result = [];
    s.forEach(v => result.push(v.x, v.y));
    return result;
}

/**
 * 预排序
 * @param sp
 * @param points
 * @return {Array}
 */
export function presorting(sp, points) {
    let len = points.length;
    let result = [];
    sp = new Point(sp.x, sp.y);
    for (let i = 0; i < len; i = i + 2) {
        let p = new Point(points[i], points[i + 1]);
        if (sp.equal(p)) continue;//不处理同一个点
        p.angle = Math.atan2(p.y - sp.y, p.x - sp.x)
        result.push(p)
    }
    result.sort((a, b) => {
        return a.angle - b.angle;
    });
    return result;
}
