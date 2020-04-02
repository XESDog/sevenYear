import {Point, Vector2} from "..";

export enum LinearType {
    LINE,
    SEGMENT
}

export class Linear {
    p1;
    p2;

    constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
    }

    get k() {
        if (this.p1.y === this.p2.y) return 0;
        if (this.p1.x === this.p2.x) return Number.MAX_SAFE_INTEGER;
        return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
    }

    /**
     * 两个端点一致
     * @param l
     * @param type
     */
    equal(l, type: LinearType = LinearType.SEGMENT) {
        if (type === LinearType.SEGMENT) {
            return (this.p1.equal(l.p1) && this.p2.equal(l.p2))
                || (this.p1.equal(l.p2) && this.p2.equal(l.p1))
        } else if (type === LinearType.LINE) {
            return this.k === l.k && this.b === l.b;
        }
    }

    /**
     * 两条线段相等，不算共端点，只有一个端点相同才返回true
     * @param l
     */
    commonEndPoint(l) {
        if (this.equal(l)) return null;
        if (this.p1.equal(l.p1) || this.p1.equal(l.p2)) {
            return this.p1;
        } else if (this.p2.equal(l.p1) || this.p2.equal(l.p2)) {
            return this.p2;
        }
        return null;
    }


    get b() {
        let k = this.k;
        if (k === 0) {
            return this.p1.y;
        } else if (k === Number.MAX_SAFE_INTEGER) {
            return null;
        } else {
            return this.p1.y - k * this.p1.x;
        }
    }

    getY(x: number, type: LinearType = LinearType.SEGMENT) {
        if (type === LinearType.SEGMENT) {
            let minX = this.p1.x > this.p2.x ? this.p2.x : this.p1.x;
            let maxX = this.p1.x > this.p2.x ? this.p1.x : this.p2.x;
            if (x < minX || x > maxX) return null;
        }

        let k = this.k;
        if (k === 0) {
            return this.p1.y;
        } else if (k === Number.MAX_SAFE_INTEGER) {
            return null;
        } else {
            return k * x + this.b;
        }
    }

    contains(p: Point | Array<number>, type: LinearType = LinearType.SEGMENT) {
        let x, y;
        if (Array.isArray(p)) {
            x = p[0];
            y = p[1];
        } else {
            x = p.x;
            y = p.y;
        }
        const v1 = Vector2.create(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        const v2 = Vector2.create(x - this.p1.x, y - this.p1.y);
        const dot = v1.dot(v2);
        const m = v1.length() * v2.length();
        if (type === LinearType.SEGMENT) {
            return m === dot
        }
        return Math.abs(m) === Math.abs(dot);
    }

    isVertical() {
        return this.k === Number.MAX_SAFE_INTEGER;
    }

    isHorizon() {
        return this.k === 0;
    }

}