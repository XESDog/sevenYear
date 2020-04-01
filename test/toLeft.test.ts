import {toLeft} from "../src";


test('presorting', () => {
    let a = {x: 0, y: 0};
    let b = {x: 100, y: 0};
    let c = {x: 100, y: 100};
    expect(toLeft(a, b, c)).toEqual(10000)
})