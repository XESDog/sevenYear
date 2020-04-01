"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JarvisMatch_1 = require("../src/utils/JarvisMatch");
var src_1 = require("../src");
test('JarvisMatch', function () {
    var points = [0, 0, 100, 0, 50, 50, 50, 100, 150, 50];
    var p = JarvisMatch_1.getExtremity(new src_1.Point(0, 0), points);
    expect(p.x + "," + p.y).toEqual('100,0');
    p = JarvisMatch_1.getExtremity(new src_1.Point(100, 0), points);
    expect(p.x + "," + p.y).toEqual('150,50');
    p = JarvisMatch_1.getExtremity(new src_1.Point(150, 50), points);
    expect(p.x + "," + p.y).toEqual('50,100');
    p = JarvisMatch_1.getExtremity(new src_1.Point(50, 100), points);
    expect(p.x + "," + p.y).toEqual('0,0');
});
//# sourceMappingURL=getExtremity.test.js.map