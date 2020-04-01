export class Parabola {
    a;b;c;
    constructor(a, b, c) {

        if (a === 0) throw new Error('二次函数系数a不能为0');

        this.a = a;
        this.b = b;
        this.c = c;

    }

    /**
     * 对称轴
     * @return {number}
     */
    get axisSymmetry() {
        return -this.b / 2 * this.a;
    }

    /**
     * 截距
     * @return {number}
     */
    get intercept() {
        return this.c;
    }

    /**
     * 交点
     * @return {null|number[]}
     */
    get intersections() {
        let d = this.b * this.b - 4 * this.a * this.c;
        if (d < 0) return null;
        if (d === 0) return [this.axisSymmetry];
        if (d > 0) {
            let dd = Math.sqrt(d) / 2 * this.a;
            return [this.axisSymmetry + dd, this.axisSymmetry - dd];
        }
    }

    getY(x) {
        return this.a * x * x + this.b * x + this.c;
    }
}