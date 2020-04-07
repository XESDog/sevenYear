import {Point} from "./Point";
import {toLeft} from "..";

export class Triangle {
    p1: Point;
    p2: Point;
    p3: Point;

    constructor(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        this.p1 = Point.create(x1, y1);
        this.p2 = Point.create(x2, y2);
        this.p3 = Point.create(x3, y3);

        if (this.p1.equal(this.p2) || this.p1.equal(this.p3) || this.p2.equal(this.p3)) {
            throw new Error(`存在至少两个点相同`);
        }

        if (toLeft(this.p1, this.p2, this.p3) === 0) {
            throw  new Error(`${this.p1},${this.p2},${this.p3},三点共线`);
        }
    }
}