import {getExtremity, JarvisMatch} from "../src/utils/JarvisMatch";
import {Point} from "../src";

test('JarvisMatch', () => {
    let points = [0, 0, 100, 0, 50, 50, 50, 100];
    expect(JarvisMatch(points).toString()).toEqual('0,0,100,0,50,100');
    points = [0, 0, 100, 0, 50, 50, 50, 100, 150, 50];
    expect(JarvisMatch(points).toString()).toEqual('0,0,100,0,150,50,50,100');
    points = [0, 0, 100, 0, 50, 50, 50, 100, 150, 50, 100, 50, 150, 100];
    expect(JarvisMatch(points).toString()).toEqual('0,0,100,0,150,50,150,100,50,100')
})

test('JarvisMatch getExtremity', () => {
    let points = [0, 0, 100, 0, 50, 50, 50, 0, 100, 50, 0, 50];
    let p = getExtremity(new Point(0, 0), points);
    expect(`${p.x},${p.y}`).toEqual('50,0');
    p = getExtremity(new Point(50, 0), points);
    expect(`${p.x},${p.y}`).toEqual('100,0');

    p = getExtremity(new Point(100, 50), points);
    expect(`${p.x},${p.y}`).toEqual('50,50');

    p = getExtremity(new Point(50, 50), points);
    expect(`${p.x},${p.y}`).toEqual('0,50');
})