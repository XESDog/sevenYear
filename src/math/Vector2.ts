export class Vector2 {
    /**
     * x轴分量
     */
    x: number;
    /**
     * y轴分量
     */
    y: number;

    /**
     *
     * @param {number} x
     * @param {number} y
     * @return {Vector2}
     */
    static create(x: number, y: number): Vector2 {
        return new Vector2(x, y);
    }

    static sub(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    static add(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
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
     * addition of vectors
     * 向量的加法运算
     * @param v
     * @return {Vector2}
     */
    add(v): Vector2 {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v): Vector2 {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * dot multiplication of vectors
     * 向量点乘
     * @param v
     * @return {number}
     */
    dot(v): number {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * cross product of vectors
     * 向量叉乘
     * @param v
     * @return {number}
     */
    cross(v): number {
        return this.x * v.y - this.y * v.x;
    }

    /**
     * from this vector to the 'v' do interpolation
     * 从当前向量到v向量做插值
     * @param v
     * @param alpha
     * @return {Vector2}
     */
    lerp(v, alpha): Vector2 {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }

    /**
     *
     * 单位向量
     * @return {Vector2}
     */
    normalize(): Vector2 {
        let length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    }

    /**
     * 法线
     * @return {Vector2}
     */
    getNormal(): Vector2 {
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

    /**
     *
     * @param v
     * @return {boolean}
     */
    equal(v): boolean {
        return this.x === v.x && this.y === v.y;
    }

    /**
     *
     * @return {number}
     */
    lengthSq(): number {
        return this.x * this.x + this.y * this.y;
    }

    /**
     *
     * @return {number}
     */
    length(): number {
        return Math.sqrt(this.lengthSq());
    }

    /**
     * the angle in radians between 0 to 2PI and the ray from (0,0) to (x,y)
     * @return {number} in [0,2PI]
     */
    angle(): number {
        let angle = Math.atan2(this.y, this.x);
        if (angle < 0) angle += Math.PI * 2;
        return angle;
    }

    /**
     *
     * @return {Vector2}
     */
    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    /**
     *
     * @return {string}
     */
    toString(): string {
        return `[Vector2 x=${this.x},y=${this.y},angle=${this.angle()},length=${this.length()}]`;
    }

}