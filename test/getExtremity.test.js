import {getExtremity} from "../src/utils/JarvisMatch";
import {Point} from "../src";

test('JarvisMatch', () => {
   let  points = [0, 0, 100, 0, 50, 50, 50, 100, 150, 50];
   let p=getExtremity(new Point(0, 0), points);
    expect(`${p.x},${p.y}`).toEqual('100,0');

    p=getExtremity(new Point(100, 0), points);
    expect(`${p.x},${p.y}`).toEqual('150,50');


    p=getExtremity(new Point(150, 50), points);
    expect(`${p.x},${p.y}`).toEqual('50,100');

    p=getExtremity(new Point(50, 100), points);
    expect(`${p.x},${p.y}`).toEqual('0,0');
})