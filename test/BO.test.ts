import {BO} from "../src/utils/BO"

it('BO', () => {
    /**
     * 两条线段共端点
     */
    let points = [
        0, 0, 100, 100,
        0, 50, 100, 100
    ];

    console.log(BO(points));

    points = [
        0, 0, 100, 100,
        0, 100, 100, 0
    ];
    console.log(BO(points));
});