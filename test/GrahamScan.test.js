"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GrahamScan_1 = require("../src/utils/GrahamScan");
test('GrahamScan', function () {
    var points = [0, 0, 100, 0, 50, 50, 100, 100];
    expect(GrahamScan_1.GrahamScan(points).toString()).toEqual('0,0,100,0,100,100');
    /*points = [152.55, 176.55
        , 292.5, 99.5
        , 320.5, 240.5
        , 320.5, 240.5
        , 205.5, 297.5
        , 388.5, 163.55
        , 333.5, 350.45
        , 426.5, 236.5
        , 325, 190.5
        , 325, 190.5
        , 210, 247.5
        , 393, 113.55
        , 338, 300.45
        , 431, 186.5
        , 232, 227.5
        , 232, 227.5
        , 117, 284.5
        , 300, 150.55
        , 245, 337.45
        , 338, 223.5
    ]

    console.time('GrahamScan')
    console.log(GrahamScan(points));
    console.timeEnd('GrahamScan')

    console.time('GrahamScanSimplification')
    console.log(GrahamScanSimplification(points));
    console.timeEnd('GrahamScanSimplification')*/
});
//# sourceMappingURL=GrahamScan.test.js.map