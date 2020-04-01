/**
 * 平面扫描算法求线段交点
 * @param points
 * @constructor
 */
import {BBST} from "../ds/BBST";
import {PriorityQueue} from "../ds/PriorityQueue";
import {Linear} from "../math/Linear";
import {Point, Vector2} from "..";
import {Comparable} from "../ds/Comparable";
import {segmentIntersection} from "./segmentIntersection";

enum PointType {
    START, INTERSECTION, END
}

interface EventVal extends Prioritizable {
    p: Point;
    pointType: PointType;
    /**
     * 起点和终点，对应的line都只有一条直线
     * 交点对应的是两条直线
     */
    line: Linear | Array<Linear>;
    /**
     * 以点的x轴坐标作为排序参考
     * priority=p.x;
     */
    priority: number;
}

interface SLSVal extends Comparable {
    /**
     * 线
     */
    line: Linear;
    /**
     * 和扫描先的y轴交点
     */
    withY: number;
}

/**
 *
 * @param points
 * @constructor
 */
export function BO(points) {
    let sls: BBST<SLSVal> = new BBST();//swap line status
    let eventQueue: PriorityQueue<EventVal> = new PriorityQueue();
    let len = points.length;
    let eventNode: EventVal = null;
    let result: Array<Point> = [];
    let x/*扫描线*/, currentSlsNode/*当前检测节点*/, prevN, nextN;
    /**
     * 线段检测表
     */
    let intersectTestMap = new Map();
    /**
     * line 和 slsNode对应表
     */
    let lineToSlsNodeMap = new Map();
    /**
     * 根据扫描线更新sls中选段withY信息
     * @param x
     */
    let updateWidthY = (x) => {
        if (sls.mRoot !== null) {
            sls.mRoot.inorder((node, userData) => {
                let line = node.val.line;
                let intersection = segmentIntersection(line.p1.toVector2(), line.p2.toVector2(),
                    new Vector2(userData, Number.MIN_SAFE_INTEGER),
                    new Vector2(userData, Number.MAX_SAFE_INTEGER));
                if (intersection) node.val.withY = intersection.y;
                return true;
            }, x)
        }
    };
    /**
     * 建立一个查询列表，方便查询两条线段是否已经检测过
     * @param key
     * @param value
     */
    let assignIntersectTestMap = (key, value) => {
        let arr = intersectTestMap.get(key);
        if (arr == undefined) {
            intersectTestMap.set(key, [value]);
        } else {
            arr.push(value);
        }
    };
    /**
     * a,b是BBST的两个节点，a.val.line是节点代表的线段，b.val.line也是节点代表的线段
     * 如果这两条线段有交点，则将交点和两条线段信息存储到eventQueue中
     * @param a
     * @param b
     */
    let compareSegment = (a, b) => {
        if (a == null || b == null) return null;
        let la = a.val.line;
        let lb = b.val.line;
        let interSection = null;
        if (!hasIntersectTest(la, lb)) {
            interSection = getIntersection(la, lb);
            if (interSection) {
                eventQueue.enqueue(createEventVal([la, lb], interSection));
                assignIntersectTestMap(la, lb);
                assignIntersectTestMap(lb, la);
            }
        }
        return interSection;
    };
    /**
     * 是否已经求过交点
     * @param la
     * @param lb
     */
    let hasIntersectTest = (la, lb) => {
        let arr = intersectTestMap.get(la);
        if (arr !== undefined) {
            if (arr.indexOf(lb) !== -1) return true;
        }

        arr = intersectTestMap.get(lb);
        if (arr !== undefined) {
            if (arr.indexOf(la) !== -1) return true;
        }
        return false;
    };
    //初始化eventQueue
    for (let i = 0; i < len; i += 4) {
        let l = new Linear(new Point(points[i], points[i + 1]), new Point(points[i + 2], points[i + 3]));
        eventQueue.enqueue(createEventVal(l, l.p1), createEventVal(l, l.p2));
    }

    while (eventQueue.size > 0) {

        eventNode = eventQueue.dequeue();
        x = eventNode.p.x;//扫描线
        updateWidthY(x);//重新设置widthY

        switch (eventNode.pointType) {
            case PointType.START:
                let val: SLSVal = createSLSVal(eventNode.line, eventNode.p.y);
                currentSlsNode = sls.insert(val);
                lineToSlsNodeMap.set(eventNode.line, currentSlsNode);

                //插入新线段，求相邻线段的交点
                prevN = currentSlsNode.inorderPrev();
                nextN = currentSlsNode.inorderNext();
                compareSegment(currentSlsNode, prevN);
                compareSegment(currentSlsNode, nextN);
                break;
            case PointType.END:
                currentSlsNode = lineToSlsNodeMap.get(eventNode.line);

                //删除线段，求相邻线段交点
                prevN = currentSlsNode.inorderPrev();
                nextN = currentSlsNode.inorderNext();
                sls.removeNode(currentSlsNode);
                compareSegment(prevN, nextN);
                break;
            case PointType.INTERSECTION:

                result.push(eventNode.p);

                let ls = eventNode.line;//两条线段
                let n1 = lineToSlsNodeMap.get(ls[0]);
                let n2 = lineToSlsNodeMap.get(ls[1]);
                let prevN1, prevN2, nextN1, nextN2;

                //交换线段信息
                lineToSlsNodeMap.set(n1.val.line, n2);
                lineToSlsNodeMap.set(n2.val.line, n1);
                let temp = n1.val;
                n1.val = n2.val;
                n2.val = temp;

                [n1, n2] = [n2, n1];//交换节点索引

                prevN1 = n1.inorderPrev();
                prevN2 = n2.inorderPrev();
                nextN1 = n1.inorderNext();
                nextN2 = n2.inorderNext();

                if (prevN1 && prevN1 !== n2) compareSegment(prevN1, n1);
                if (nextN1 && nextN1 !== n2) compareSegment(nextN1, n1);

                if (prevN2 && prevN2 !== n1) compareSegment(prevN2, n2);
                if (nextN2 && nextN2 !== n1) compareSegment(nextN2, n2);

                break;
        }
    }

    return result;
}

/**
 * 求sls中两条线段的交点
 * @param la
 * @param lb
 */
function getIntersection(la: Linear, lb: Linear) {
    return segmentIntersection(la.p1.toVector2(), la.p2.toVector2(),
        lb.p1.toVector2(), lb.p2.toVector2());

}

function createSLSVal(line, y): SLSVal {
    return {
        line: line,
        withY: y,
        compare(other: any): number {
            if (this.line === other.line) return 0;
            return this.withY - other.withY;
        }
    };
}

function createEventVal(l: Linear | Array<Linear>, p): EventVal {

    let pointType = null;
    if (!Array.isArray(l)) {
        let line: Linear = l as Linear;
        if (p == line.p1) {
            pointType = p.x < line.p2.x ? PointType.START : PointType.END
        } else if (p == line.p2) {
            pointType = p.x < line.p1.x ? PointType.START : PointType.END
        } else {
            throw new Error('p点必须是线段l的端点之一');
        }
    } else {
        pointType = PointType.INTERSECTION;
    }
    return {
        p: p,
        line: l,
        priority: p.x,
        pointType
    };
}

