export class Rectangle {
    x;
    y;
    width;
    height;

    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(x, y) {
        if (this.width <= 0 || this.height <= 0) {
            return false;
        }

        if (x >= this.x && x < this.x + this.width) {
            if (y >= this.y && y < this.y + this.height) {
                return true;
            }
        }
        return false;
    }

    area() {
        return this.width * this.height;
    }

    equal(rect) {
        return this.x === rect.x && this.y === rect.y && this.width === rect.width && this.height === rect.height;
    }

    clone() {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    toString() {
        return `[Rectangle x=${this.x},y=${this.y},width=${this.width},height=${this.height},area=${this.area()}]`
    }

    static get EMPTY(): Rectangle {
        return new Rectangle(0, 0, 0, 0);
    }

}