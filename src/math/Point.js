import {Vector2} from "./Vector2";

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
}