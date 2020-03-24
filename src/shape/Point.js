import {Vector2} from "..";

export class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y
    }

    clone() {
        return new Point(this.x, this.y)
    }

    toVector2() {
        return new Vector2(this.x, this.y);
    }

    equal(p) {
        return this.x === p.x && this.y === p.y;
    }
}