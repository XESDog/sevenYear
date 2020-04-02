import {BO} from "../src/utils/BO"
import {Point} from "../src";

it('BO', () => {
    /**
     * 两条线段共端点
     */
    let points = [
        0, 0, 100, 100,
        0, 50, 100, 100
    ];

    let bo = BO(points);
    expect(bo.length).toEqual(1);
    expect(bo[0].equal(new Point(100, 100))).toBeTruthy()

    //一条垂直线
    points = [100, 100, 100, 200];

    bo = BO(points)
    expect(bo.length).toEqual(0);

    points = [100, 100, 100, 0,
        0, 0, 200, 100
    ]
    bo = BO(points)
    expect(bo.length).toEqual(1);
    expect(bo[0].equal(new Point(100, 50))).toBeTruthy();

    //两条交叉线
    points = [
        0, 0, 100, 100,
        0, 100, 100, 0
    ];
    bo = BO(points)
    expect(bo.length).toEqual(1);
    expect(bo[0].equal(new Point(50, 50))).toBeTruthy();

    points = [
        136.05, 263, 286, 77.05
        , 77.05, 233.05, 422, 180.05
        , 170, 90.05, 452, 273
    ];

    // console.log(BO(points));

    points = [
        136.05, 263, 286, 77.05
        , 77.05, 233.05, 422, 180.05
        , 170, 90.05, 452, 273
        , 87.05, 143.05, 243, 305
        , 186, 288, 482, 226.05
        , 408, 69.05, 319, 386
        , 338, 110.05, 478, 188.05
        , 350, 137.05, 478, 82.05
        , 445, 74.05, 452, 196.05
        , 411, 280, 498, 244.05
        , 58.05, 336, 217, 450
        , 56.05, 417, 205, 366
        , 56.05, 262.05, 132.05, 309.05
        , 41.05, 174.05, 117.05, 128.05
        , 56.05, 66.05, 58.05, 134.05
        , 84.05, 46.05, 72.05, 111.05
        , 27.05, 33.05, 25.05, 152.05
        , 10.05, 93.05, 268, 93.05
        , 242, 39.05, 242, 240.05
        , 530, 161.05, 536, 314.05
        , 291, 322, 480, 322
        , 313, 72.05, 384, 375
        , 295, 376, 648, 220.05
        , 599, 178.05, 623, 355
        , 593, 365, 636, 310
        , 580, 198.05, 572, 287
        , 398, 381, 481, 410
        , 464, 394, 406, 423
        , 151.05, 435, 231, 416
        , 194, 343, 194, 417
        , 119.05, 331, 239, 331
        , 271, 296, 353, 290
        , 481, 119.05, 481, 444
        , 586, 124.05, 445, 367
        , 135.05, 31.05, 170, 65.05
        , 137.05, 69.05, 192, 12.05
        , 309, 37.05, 447, 62.05
        , 187, 139.05, 436, 35.05
        , 391, 55.05, 249, 282
        , 125.05, 248, 104.05, 365
        , 52.05, 380, 327, 351
        , 287, 380, 426, 277
        , 390, 288, 341, 462
        , 293, 440, 479, 447
        , 336, 374, 462, 480
        , 84.05, 248, 46.05, 318
        , 49.05, 222.05, 7.05, 303
        , 21.05, 231.05, 90.05, 238
        , 88.05, 203.05, 33.05, 267
        , 65.05, 191.05, 230, 167.05
        , 270, 55.05, 407, 35.05
        , 434, 18.05, 556, 104.05
        , 579, 51.05, 491, 148.05
        , 523, 39.05, 457, 287
        , 483, 121.05, 608, 79.05
        , 594, 46.05, 587, 153.05
        , 539, 144.05, 620, 116.05
        , 628, 95.05, 590, 214.05
        , 575, 323, 482, 348
        , 556, 303, 497, 402
        , 445, 377, 603, 388
        , 589, 359, 497, 465
        , 270, 422, 287, 483
        , 203, 473, 340, 413
        , 244, 421, 71.05, 470
        , 70.05, 394, 139.05, 470
        , 76.05, 457, 158.05, 418
        , 144.05, 415, 20.05, 423
        , 29.05, 377, 69.05, 448
        , 65.05, 352, 70.05, 425
        , -3.95, 351, 106.05, 333
        , 31.05, 371, 81.05, 274
        , 26.05, 301, 69.05, 386
        , 492, 429, 546, 455
        , 541, 375, 587, 458
        , 515, 416, 624, 415
        , 627, 386, 577, 471
        , 310, 235.05, 348, 288
        , 242, 226.05, 303, 292
        , 171, 282, 210, 230.05
        , 151.05, 294, 157.05, 365
        , 166, 358, 205, 302
        , 330, 236.05, 307, 291
        , 239, 266, 226, 289
        , 159.05, 260, 208, 283
        , 107.05, 266, 138.05, 282
        , 107.05, 229.05, 165.05, 154.05
        , 166, 153.05, 207, 190.05
        , 138.05, 163.05, 171, 195.05
        , 272, 176.05, 327, 168.05
        , 392, 200.05, 388, 265
        , 439, 213.05, 428, 275
        , 463, 216.05, 513, 200.05
        , 506, 180.05, 552, 187.05
        , 601, 148.05, 622, 174.05
        , 627, 199.05, 558, 226.05
        , 504, 231.05, 552, 267
        , 517, 292, 476, 278
        , 427, 294, 429, 371
        , 253, 347, 258, 411
        , 233, 401, 304, 327
        , 296, 387, 220, 384
        , 229, 361, 243, 398
        , 287, 406, 337, 469
        , 313, 402, 349, 445

    ];
    let str = '';
    console.time('BO')
    BO(points).forEach(v => {
        str += ',' + v.x + ',' + v.y
    });
    console.timeEnd('BO')
    console.log(str)

});