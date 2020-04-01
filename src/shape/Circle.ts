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

    clone() {
        return new Circle([this.x, this.y], this.radius);
    }

    toString() {
        return `[Circle x=${this.x},y=${this.y},radius:${this.radius}]`;
    }
}
