export class Vector2 {
    static create(x, y) {
        return new Vector2(x, y);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x
        this.y = y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }

    normalize() {
        let length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    }

    /**
     * 法线
     * @return {Vector2}
     */
    getNormal() {
        return new Vector2(this.y, -this.x);
    }

    /**
     * 矢量v在当前矢量上的投影
     * @param v
     * @return {number}
     */
    getProjection(v) {
        return this.dot(v) / this.length();
    }

    equal(v) {
        return this.x === v.x && this.y === v.y;
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    length() {
        return Math.sqrt(this.lengthSq());
    }

    angle() {
        let angle = Math.atan2(this.y, this.x);
        if (angle < 0) angle += Math.PI * 2;
        return angle;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

}