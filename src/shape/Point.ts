import {Vector2} from "..";

export class Point {
    x;y;
    constructor(x:number = 0, y:number = 0) {
        this.x = x;
        this.y = y
    }

    clone() {
        return new Point(this.x, this.y)
    }

    toVector2() {
        return new Vector2(this.x, this.y);
    }

    equal(p:Point) {
        return this.x === p.x && this.y === p.y;
    }
    toString(){
        return `[Point x=${this.x},y=${this.y}]`;
    }
}