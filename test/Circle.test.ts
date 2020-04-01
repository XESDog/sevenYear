import {Circle} from "../src";

test('Circle', () => {
    let c = new Circle([0, 0], 10);
    expect(c.contains([5, 5])).toBeTruthy();
})