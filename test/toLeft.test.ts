import {toLeft} from "../src";


test('toLeft value', () => {
    let a = {x: 0, y: 0};
    let b = {x: 100, y: 0};
    let c = {x: 100, y: 100};
    expect(toLeft(a, b, c)).toEqual(10000);
    expect(toLeft(a, c, b)).toEqual(-10000);

    let d={x:200,y:0};
    expect(toLeft(a,b,d)).toEqual(0)
})