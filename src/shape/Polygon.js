import {Point} from "..";

export class Polygon {
    constructor(...points) {
        if (Array.isArray(points[0])) {
            points = points[0];
        }

        if (points[0] instanceof Point) {
            const p = [];

            for (let i = 0, il = points.length; i < il; i++) {
                p.push(points[i].x, points[i].y);
            }

            points = p;
        }
        this.points = points;
    }


    contains(x, y) {
        let inside = false;
        const length = this.points.length / 2;

        //使用射线法判断点是否在多边形内，引一条射线，如果有基数个交点则在多边形内，偶数了交点则在多边形外
        for (let i = 0, j = length - 1; i < length; j = i++) {
            const xi = this.points[i * 2];
            const yi = this.points[(i * 2) + 1];
            const xj = this.points[j * 2];
            const yj = this.points[(j * 2) + 1];
            const intersect = ((yi > y) !== (yj > y))//是否在y的上下两侧
                && (x < ((xj - xi) * ((y - yi) / (yj - yi))) + xi);//直线方程两点式，线段与平行于x轴的射线之间的交点大于目标点x

            if (intersect) {
                inside = !inside;
            }
        }
        return inside;
    }

    clone() {
        return new Polygon(this.points.slice());
    }
}