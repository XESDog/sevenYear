/**
 * Jarvis Match算法————从给定点集合中生成凸包
 * @param points
 * @constructor
 */
import {toLeft} from "./toLeft";
import {ltl} from "./ltl";
import {Point} from "..";

export function JarvisMatch(points) {
    if (points.length < 6) throw new Error('不能少于三个顶点');
    let a = ltl(points);
    let r = [];
    let result = [];
    let ex = a;
    do {
        r.push(ex);
        ex = getExtremity(ex, points);
    } while (!ex.equal(a));

    r.forEach(v => result.push(v.x, v.y));
    return result;

}

/**
 * 根据一个极点a和点的集合，获取逆时针方向的下一个极点
 * @param ex
 * @param points
 * @return {Point}
 */
export function getExtremity(ex, points) {
    let len = points.length;
    for (let i = 0; i < len; i = i + 2) {
        let b = new Point(points[i], points[i + 1]);
        let extremity = true;//是否极点
        if (ex.equal(b)) continue;
        for (let j = 0; j < len; j = j + 2) {
            let c = new Point(points[j], points[j + 1]);
            if (ex.equal(c)) continue;
            if (b.equal(c)) continue;
            if (toLeft(ex, b, c) <= 0) {
                extremity = false;
                break;
            }
        }
        if (extremity) return b;
    }
    return null;
}

