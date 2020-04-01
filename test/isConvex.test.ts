import {Polygon} from "../src";

test('Polygon isConvex', () => {

    /**
     * 方形
     * @type {Polygon}
     */
    let p = new Polygon([0, 0, 100, 0, 100, 100, 0, 100]);
    expect(p.isConvex()).toBeTruthy();

    /**
     * 凹
     * @type {Polygon}
     */
    let p2 = new Polygon([0, 0, 50, 50, 100, 0, 100, 100, 0, 100]);
    expect(p2.isConvex()).toBeFalsy();

    /**
     * 共线
     * @type {Polygon}
     */
    let p3 = new Polygon([0, 0, 80, 0, 100, 0, 100, 100, 0, 100]);
    expect(p3.isConvex()).toBeTruthy();

});