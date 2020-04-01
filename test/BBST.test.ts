import {BBST} from "../src/ds/BBST";

test('BBST', () => {
    let bbst = new BBST()
    bbst.insert(1);
    bbst.insert(5);
    bbst.insert(3);
    bbst.insert(4);
    bbst.insert(2);
    bbst.insert(6);
    bbst.insert(10);
    bbst.insert(8);
    bbst.insert(9);
    bbst.insert(7);
    console.log(bbst.toString())
})