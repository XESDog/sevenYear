"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
test('presorting', function () {
    var a = { x: 0, y: 0 };
    var b = { x: 100, y: 0 };
    var c = { x: 100, y: 100 };
    expect(src_1.toLeft(a, b, c)).toEqual(10000);
});
//# sourceMappingURL=toLeft.test.js.map