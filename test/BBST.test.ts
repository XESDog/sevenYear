import {BBST} from "../src/ds/BBST";
import {Comparable} from "../src/ds/Comparable";

class Element implements Comparable {
    val;

    constructor(val) {
        this.val = val;
    }

    compare(other): number {
        return this.val - other.val;
    }
}

test('BBST', () => {
    let bbst = new BBST()
    bbst.insert(new Element(1));
    bbst.insert(new Element(5));
    bbst.insert(new Element(3));
    bbst.insert(new Element(4));
    bbst.insert(new Element(2));
    bbst.insert(new Element(6));
    bbst.insert(new Element(10));
    bbst.insert(new Element(8));
    bbst.insert(new Element(9));
    bbst.insert(new Element(7));
})