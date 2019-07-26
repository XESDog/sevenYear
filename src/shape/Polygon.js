import {Point, Vector2} from "..";

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

        if (this.points.length < 6) throw new Error('多边形最少需要3个顶点');
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

    /**
     * 是否凸多边形
     * 解法：任意一条边无线延伸，其他的点均在这条边的一侧，称为凸多边形
     * @return {boolean}
     */
    isConvex() {
        let sign = null;//符号
        let sign2 = null;
        let length = this.points.length / 2;
        if (length < 3) return false;

        let ps = this.points;//最后一个点和最前面一个点也能组成一条边
        let v1 = new Vector2();
        let v2 = new Vector2();

        let getCrossSign = (v1, v2) => {
            let r = v1.cross(v2);
            if (r > 0) return 1;
            if (r === 0) return 0;
            if (r < 0) return -1;
        };

        for (let i = 0, j = length - 1; i < length; j = i++) {
            v1.set(ps[i * 2] - ps[j * 2], ps[i * 2 + 1] - ps[j * 2 + 1]);

            for (let k = 0; k < length; k++) {
                if (k === i || k === j) continue;
                v2.set(ps[i * 2] - ps[k * 2], ps[i * 2 + 1] - ps[k * 2 + 1]);

                sign2 = getCrossSign(v1, v2);
                if (sign === null) {
                    if (sign2 !== 0) sign = sign2;
                } else {
                    if (sign2 !== 0 && sign !== sign2) return false;
                }
            }
        }
        return true;
    }

    clone() {
        return new Polygon(this.points.slice());
    }
}