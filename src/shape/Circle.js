import {Vector2} from "..";

export class Circle {
    constructor(x=0, y=0, radius=0) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.r2 = this.radius * this.radius;
    }

    area() {
        return Math.PI * this.r2;
    }

    contains(x, y) {
        const v = Vector2.create(x, y).sub(Vector2.create(this.x, this.y));
        return v.lengthSq() <= this.r2;
    }
    clone(){
        return new Circle(this.x, this.y, this.radius);
    }
}
