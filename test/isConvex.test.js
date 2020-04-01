"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
test('Polygon isConvex', function () {
    /**
     * 方形
     * @type {Polygon}
     */
    var p = new src_1.Polygon([0, 0, 100, 0, 100, 100, 0, 100]);
    expect(p.isConvex()).toBeTruthy();
    /**
     * 凹
     * @type {Polygon}
     */
    var p2 = new src_1.Polygon([0, 0, 50, 50, 100, 0, 100, 100, 0, 100]);
    expect(p2.isConvex()).toBeFalsy();
    /**
     * 共线
     * @type {Polygon}
     */
    var p3 = new src_1.Polygon([0, 0, 80, 0, 100, 0, 100, 100, 0, 100]);
    expect(p3.isConvex()).toBeTruthy();
});
//# sourceMappingURL=isConvex.test.js.map