import {Point} from "..";

/**
 * lowest-then-leftmost
 * 从参数points中找出x,y最小的点作为第一个极点
 *
 * @param {Array<number>} points [x1,y1,x2,y2....xn,yn]
 * @return {Point}
 */
export function ltl(points: Array<number>): Point {
    if (points.length < 6) throw new Error('no less than three vertices');
    let result: Point = null;
    let len = points.length;

    //先查找y值最小的点，如果点的y值相同，再找x值最小的点
    for (let i = 0; i < len; i = i + 2) {
        if (!result) {
            result=new Point(points[0], points[1]);
            continue;
        }
        if (points[i + 1] < result[1]) {
            result.set(points.slice(i, i + 2));
        } else if (points[i + 1] === result[1]) {
            if (points[i] < result[0]) {
                result.set(points.slice(i, i + 2));
            }
        }
    }
    return result;
}