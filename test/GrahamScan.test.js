import {GrahamScan} from "../src/utils/GrahamScan";

test('GrahamScan',()=>{
    let points = [0,0,100,0,50,50,100,100];

    expect(GrahamScan(points).toString()).toEqual('0,0,100,0,100,100')


})