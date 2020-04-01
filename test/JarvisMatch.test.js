"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JarvisMatch_1 = require("../src/utils/JarvisMatch");
test('JarvisMatch', function () {
    var points = [0, 0, 100, 0, 50, 50, 50, 100];
    expect(JarvisMatch_1.JarvisMatch(points).toString()).toEqual('0,0,100,0,50,100');
    points = [0, 0, 100, 0, 50, 50, 50, 100, 150, 50];
    expect(JarvisMatch_1.JarvisMatch(points).toString()).toEqual('0,0,100,0,150,50,50,100');
    points = [0, 0, 100, 0, 50, 50, 50, 100, 150, 50, 100, 50, 150, 100];
    expect(JarvisMatch_1.JarvisMatch(points).toString()).toEqual('0,0,100,0,150,50,150,100,50,100');
});
//# sourceMappingURL=JarvisMatch.test.js.map