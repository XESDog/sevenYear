import {Point} from "..";

/**
 * lowest-then-leftmost
 * @param points
 * @return {*[]}
 */
export function ltl(points) {
    if (points.length < 6) throw new Error('不能少于三个顶点')
    let result = null;
    let len = points.length;
    let assignResult = (x, y) => {
        result.x = x;
        result.y = y;
    };
    for (let i = 0; i < len; i = i + 2) {
        //初始化第一个点
        if (!result) {
            result = new Point(points[0], points[1]);
            continue;
        }
        if (points[i] < result[1]) {
            assignResult(points.slice(i - 1, i + 1));
        } else if (points[i] === result[1]) {
            if (points[i - 1] < result[0]) {
                assignResult(points.slice(i - 1, i + 1));
            }
        }
    }
    return result;
}