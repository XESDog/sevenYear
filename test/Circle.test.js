"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
test('Circle', function () {
    var c = new src_1.Circle(0, 0, 10);
    expect(c.contains(5, 5)).toBeTruthy();
    // expect(c.contains(new Point(5,5))).toBeTruthy();
});
//# sourceMappingURL=Circle.test.js.map