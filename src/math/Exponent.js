export class Exponent {
    constructor(a) {
        this.a = a;
    }
    getY(x){
        return Math.pow(this.a, x);
    }
}