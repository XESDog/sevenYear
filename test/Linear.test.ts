import {Linear, LinearType} from "../src/math/Linear";
import {Point} from "../src";

test('Linear contains', () => {
    let l = new Linear(new Point(0, 0), new Point(100, 100))
    let p = new Point(50, 50);
    expect(l.contains(p)).toBeTruthy();

    p = new Point(-50, -50);
    expect(l.contains(p)).toBeFalsy();
    expect(l.contains(p, LinearType.LINE)).toBeTruthy();
})

test('Linear getY', () => {
    let l = new Linear(new Point(0, -100), new Point(100, 100))
    expect(l.getY(50)).toEqual(0);
    expect(l.getY(200)).toBeNull()
    expect(l.getY(-100)).toBeNull()
    expect(l.getY(0)).toEqual(-100)

})
test('Linear equal', () => {
    let l = new Linear(new Point(0, 0), new Point(100, 100));
    let l2 = new Linear(new Point(100, 100), new Point(0, 0));
    expect(l.equal(l2)).toBeTruthy();
})
test('Linear commonEndPoint', () => {
    let l = new Linear(new Point(0, 0), new Point(100, 100));
    let l2 = new Linear(new Point(100, 100), new Point(100, 0));
    let l3 = new Linear(new Point(0, 10), new Point(10, 10));
    expect(l.commonEndPoint(l2).equal(new Point(100, 100))).toBeTruthy()
    expect(l.commonEndPoint(l3)).toBeNull();
})
test('Linear isVertical', () => {
    let l = new Linear(new Point(50, 50), new Point(50, 100));
    expect(l.isVertical()).toBeTruthy();
})

test('Linear isHorizon', () => {
    let l = new Linear(new Point(50, 50), new Point(0, 50));
    expect(l.isHorizon()).toBeTruthy();
})