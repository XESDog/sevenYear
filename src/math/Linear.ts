import {Point, Vector2} from "..";

export class Linear {
    p1;
    p2;

    constructor(p1:Point, p2:Point) {
        this.p1 = p1;
        this.p2 = p2;
    }

    get k() {
        if (this.p1.y === this.p2.y) return 0;
        if (this.p1.x === this.p2.x) return Infinity;
        return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
    }

    get b() {
        let k = this.k;
        if (k === 0) {
            return this.p1.y;
        } else if (k === Infinity) {
            return null;
        } else {
            return this.p1.y - k * this.p1.x;
        }
    }

    getY(x:number) {
        let k = this.k;
        if (k === 0) {
            return this.p1.y;
        } else if (k === Infinity) {
            return null;
        } else {
            return k * x + this.b;
        }
    }

    contains(p: Point | Array<number>) {
        let x, y;
        if (Array.isArray(p)) {
            x = p[0];
            y = p[1];
        } else {
            x = p.x;
            y = p.y;
        }
        const v1 = Vector2.create(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        const v2 = Vector2.create(this.p2.x - x, this.p2.y - y);
        return v1.cross(v2) < 1e-10;//小于一定误差范围
    }
}