"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
test('get ltl', function () {
    var points = [0, 0, 1, 1];
    expect(function () { return src_1.ltl(points); }).toThrowError(Error);
    points = [100, 100, 200, 100, 300, 500,];
    var p = src_1.ltl(points);
    expect(p.x + "," + p.y).toEqual('100,100');
});
//# sourceMappingURL=ltl.test.js.map