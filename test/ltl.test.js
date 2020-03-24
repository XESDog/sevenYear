import {ltl} from "../src";

test('get ltl',()=>{
    let points = [0, 0, 1, 1];
    expect(()=>ltl(points)).toThrowError(Error)

    points = [100, 100, 200, 100, 300, 500,];
    let p = ltl(points);
    expect(`${p.x},${p.y}`).toEqual('100,100')
})