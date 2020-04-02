import {ltl, presorting} from "../src";

test('presorting', () => {
    let points = [0, 0, 100, 0, 50, 50, 100, 100];
    let sp = ltl(points);
    expect(presorting(sp, points).map(v => v.x + ',' + v.y)).toEqual(["100,0", "50,50", "100,100"])
})