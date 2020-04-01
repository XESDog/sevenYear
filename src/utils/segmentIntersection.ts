import {toLeft, Vector2} from "..";

/**
 * 线段s1的两个端点分别在s2的左右，同时线段s2的两个端点分别在s1的左右，那么两条线段相交
 * @param s1p1
 * @param s1p2
 * @param s2p1
 * @param s2p2
 */
export function hasIntersection(s1p1: Vector2, s1p2: Vector2, s2p1: Vector2, s2p2: Vector2): boolean {
    let a = toLeft(s1p1, s1p2, s2p1) > 0 ? 1 : 0;
    let b = toLeft(s1p1, s1p2, s2p2) > 0 ? 1 : 0;
    let c = toLeft(s2p1, s2p2, s1p1) > 0 ? 1 : 0;
    let d = toLeft(s2p1, s2p2, s1p2) > 0 ? 1 : 0;
    return (a ^ b) && (c ^ d) > 0
}

/**
 * 以s2为基线，分别用s1p1，s1p2和其组成三角形，通过面积除以底来求出两个三角形的高度比，分别是d1和d2，s1被交点分割的比例就是d1/d2
 * @param s1p1
 * @param s1p2
 * @param s2p1
 * @param s2p2
 */
export function segmentIntersection(s1p1: Vector2, s1p2: Vector2, s2p1: Vector2, s2p2: Vector2): Vector2 {
    if (hasIntersection(s1p1, s1p2, s2p1, s2p2)) {//相交
        let base = s2p2.clone().sub(s2p1)
        let baseLength = base.length();
        let area1 = base.cross(s1p1.clone().sub(s2p1));
        let d1 = Math.abs(area1) / baseLength
        let area2 = base.cross(s1p2.clone().sub(s2p2));
        let d2 = Math.abs(area2) / baseLength;
        let t = d1 / (d1 + d2);
        return s1p1.lerp(s1p2, t);

    }
    return null;
}