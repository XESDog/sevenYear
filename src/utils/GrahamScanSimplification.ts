import {itr} from "./GrahamScan";
import {Point} from "..";

/**
 * 按照x轴从大到小排序
 * @param points
 * @return {Array}
 */
function presorting(points) {
    let len = points.length;
    let result = [];
    for (let i = 0; i < len; i += 2) {
        result.push(new Point(points[i], points[i + 1]));
    }
    result.sort((a, b) => b.x - a.x);
    return result;
}

/**
 * GrahamScan简化算法，将第一个极点定义成y轴无限远的位置，那么剩下点跟该极点的角度排序可以简化成x轴坐标排序
 * @param points
 * @return {...any[]}
 * @constructor
 */
export function GrahamScanSimplification(points) {
    let sp = new Point(0, Number.MIN_VALUE);
    let s = [sp];
    let sortedPoints = presorting(points);
    let t = sortedPoints.concat();
    s.push(t.shift());

    let upperHull = itr(s, t);

    s = [new Point(0, Number.MAX_VALUE)];
    t = sortedPoints.reverse();

    s.push(t.shift());
    let lowerHull = itr(s, t);

    //将最小值和重复的顶点删除
    return [...upperHull.slice(4), ...lowerHull.slice(4)];

}


