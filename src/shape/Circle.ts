import {Point, Vector2} from "..";

export class Circle {
    x: number;
    y: number;
    radius: number;
    r2: number;//r^2

    constructor(p: Point | Array<number>, radius: number) {
        let x, y;
        if (Array.isArray(p)) {
            x = p[0];
            y = p[1];
        } else {
            x = p.x;
            y = p.y;
        }
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.r2 = this.radius * this.radius;

    }

    get area() {
        return Math.PI * this.r2;
    }

    /**
     * 点是否在圆上
     * 注意：圆周上的点在圆上
     * @param p
     */
    contains(p: Point | Array<number>): boolean {
        let x, y;
        if (Array.isArray(p)) {
            x = p[0];
            y = p[1];
        } else {
            x = p.x;
            y = p.y;
        }

        const v = Vector2.create(x, y).sub(Vector2.create(this.x, this.y));
        return v.lengthSq() <= this.r2;
    }

    equal(circle) {
        return this.x === circle.x && this.y === circle.y && this.radius === circle.radius;
    }

    clone() {
        return new Circle([this.x, this.y], this.radius);
    }

    toString() {
        return `[Circle x=${this.x},y=${this.y},radius:${this.radius}]`;
    }
}
