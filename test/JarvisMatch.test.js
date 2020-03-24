import {JarvisMatch} from "../src/utils/JarvisMatch";

test('JarvisMatch', () => {
    let points = [0, 0, 100, 0, 50, 50, 50, 100];
    expect(JarvisMatch(points).toString()).toEqual('0,0,100,0,50,100');
    points = [0, 0, 100, 0, 50, 50, 50, 100, 150, 50];
    expect(JarvisMatch(points).toString()).toEqual('0,0,100,0,150,50,50,100')
    points = [0, 0, 100, 0, 50, 50, 50, 100, 150, 50,100,50,150,100];
    expect(JarvisMatch(points).toString()).toEqual('0,0,100,0,150,50,150,100,50,100')
})