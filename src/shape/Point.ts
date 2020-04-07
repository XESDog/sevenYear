import {Vector2} from "..";

export class Point {
    /**
     *
     */
    x: number;
    /**
     *
     */
    y: number;

    /**
     *
     * @param {number} x
     * @param {number} y
     * @return {Point}
     */
    static create(x: number, y: number): Point {
        return new Point(x, y);
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y
    }

    /**
     *
     * @param {number | Array<number> | {x: number; y: number}} x
     * @param {number} y
     */
    set(x: number | Array<number> | { x: number, y: number }, y?: number) {
        if (y == undefined) {
            if (Array.isArray(x)) {
                this.x = x[0];
                this.y = x[1];
            } else {
                this.x = x['x'];
                this.y = x['y'];
            }
        } else {
            this.x = x as number;
            this.y = y as number;
        }
    }

    /**
     *
     * @return {Point}
     */
    clone():Point {
        return new Point(this.x, this.y)
    }

    /**
     *
     * @return {Vector2}
     */
    toVector2():Vector2 {
        return new Vector2(this.x, this.y);
    }

    /**
     *
     * @param {Point} p
     * @return {boolean}
     */
    equal(p: Point):boolean {
        return this.x === p.x && this.y === p.y;
    }

    /**
     *
     * @return {string}
     */
    toString():string {
        return `[Point x=${this.x},y=${this.y}]`;
    }
}