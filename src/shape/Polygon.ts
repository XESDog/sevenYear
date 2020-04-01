import {Point, toLeft} from "..";

export class Polygon {
    rawPoints;
    points;
    /**
     *
     * @param points
     */
    constructor(points:Array<number>) {
        if (points.length < 6) throw new Error('多边形最少需要3个顶点');
        if (points.length % 2 !== 0) throw new Error('多边形参数需要偶数个Number');
        this.rawPoints = points;
        this.points = [];

        let len = this.rawPoints.length;
        for (let i = 0; i < len; i += 2) {
            this.points.push(new Point(this.rawPoints[i], this.rawPoints[i + 1]));
        }
    }

    contains(p: Point | Array<number>): boolean {
        let x, y;
        if (Array.isArray(p)) {
            x = p[0];
            y = p[1];
        } else {
            x = p.x;
            y = p.y;
        }
        let inside = false;
        const len = this.points.length;

        //使用射线法判断点是否在多边形内，引一条射线，如果有基数个交点则在多边形内，偶数了交点则在多边形外
        let a, b;
        for (let i = 0, j = len - 1; i < len; j = i++) {
            a = this.points[j];
            b = this.points[i];
            const xi = a.x;
            const yi = a.y;
            const xj = b.x;
            const yj = b.y;
            const intersect = ((yi > y) !== (yj > y))//是否在y的上下两侧
                && (x < ((xj - xi) * ((y - yi) / (yj - yi))) + xi);//直线方程两点式，线段与平行于x轴的射线之间的交点大于目标点x

            if (intersect) {
                inside = !inside;
            }
        }
        return inside;
    }

    /**
     * 解法：任意一条边无线延伸，其他的点均在这条边的一侧，称为凸多边形
     * @return {boolean}
     */
    isConvex() {
        let len = this.points.length;
        let a, b, c;
        for (let i = 0, j = len - 1; i < len; j = i++) {
            a = this.points[j];
            b = this.points[i];
            for (let k = 0; k < len; k++) {
                c = this.points[k];
                if (c.equal(a) || c.equal(b)) continue;
                if (toLeft(a, b, c) < 0) return false;
            }
        }
        return true;
    }

    clone() {
        return new Polygon(this.rawPoints.concat());
    }
}