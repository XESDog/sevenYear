import {ltl, presorting} from "../src";

test('presorting', () => {
    let points = [0, 0, 100, 0, 50, 50, 100, 100];

    let sp = ltl(points);
    // console.log(presorting(sp,points))

    // expect(presorting(points).toString()).toEqual('100,100')
})