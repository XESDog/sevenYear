import {Vector2} from "..";

/**
 * 分离轴定理
 * @param polygonA
 * @param polygonB
 * @return {boolean}
 * @constructor
 */
export const SAT = (polygonA, polygonB) => {
    return !(!itrPolygonEdge(polygonA, polygonB) || !itrPolygonEdge(polygonB, polygonA));
}

/**
 * 以polygon为参照物，依次获取polygon每一条边的法线跟otherPolygon做比较，返回是否相交
 * @param polygon
 * @param otherPolygon
 * @return {boolean}
 */
function itrPolygonEdge(polygon, otherPolygon) {
    let points = polygon.points;
    let normal = null;
    let v = new Vector2();
    let intersect = false;
    let projection = null;
    let otherProjection = null;
    for (let i = 0; i < points.length - 1; i = i + 2) {

        //挑选一条边，沿该边作法线
        if (i === points.length - 2) {
            //和第一个点组成的边
            v.set(points[0] - points[i], points[1] - points[i + 1]);
        } else {
            v.set(points[i + 2] - points[i], points[i + 3] - points[i + 1]);
        }

        normal = v.getNormal();

        projection = getPolygonProjection(polygon, normal);
        otherProjection = getPolygonProjection(otherPolygon, normal);

        let sort = projection.concat(otherProjection).sort((a, b) => b - a);
        let len = Math.abs(sort[3] - sort[0]);

        intersect = (Math.abs(projection[1] - projection[0]) + Math.abs(otherProjection[1] - otherProjection[0])) > len;
        //只要有一次不相交，则说明两个多边形不相交
        if (!intersect) return false;
    }
    return true;
}

/**
 * 多边形在矢量v上的投影
 * @param polygon
 * @param v
 * @return {number[]}
 */
function getPolygonProjection(polygon, v) {
    let j = 0;
    let projection = null;
    let aPoints = polygon.points;
    let min = null;
    let max = null;
    //多边形A在normal上的投影
    while (j < aPoints.length) {
        projection = v.getProjection(Vector2.create(aPoints[j], aPoints[j + 1]));
        if (min === null) min = projection;
        if (max === null) max = projection;
        if (min > projection) min = projection;
        if (max < projection) max = projection;

        j += 2;
    }

    return [min, max];
}
