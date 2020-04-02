import {BBST} from "../ds/BBST";
import {PriorityQueue} from "../ds/PriorityQueue";
import {Linear, LinearType} from "../math/Linear";
import {Point} from "..";
import {Comparable} from "../ds/Comparable";
import {segmentIntersection} from "./segmentIntersection";

/**
 *  point type enum
 */
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
 * 求sls中两条线段的交点
 * @param la
 * @param lb
 */
function getIntersection(la: Linear, lb: Linear) {
    return segmentIntersection(la.p1.toVector2(), la.p2.toVector2(),
        lb.p1.toVector2(), lb.p2.toVector2());

}

/**
 * create sls val
 * @param line
 * @param y
 */
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

/**
 *
 * @param l
 * @param p
 * @param pointType 如果线段垂直于x轴，线段的两个点必须有一个是起点，有一个是终点，在这个方法中无法判断，因此通过外传的方式强制设定pointType
 */
function createEventVal(l: Linear | Array<Linear>, p, pointType?: PointType): EventVal {

    if (pointType === undefined && !Array.isArray(l)) {
        let line: Linear = l as Linear;
        if (p == line.p1) {
            pointType = p.x < line.p2.x ? PointType.START : PointType.END
        } else if (p == line.p2) {
            pointType = p.x < line.p1.x ? PointType.START : PointType.END
        } else {
            throw new Error('p点必须是线段l的端点之一');
        }
    }
    return {
        p: p,
        line: l,
        priority: p.x,
        pointType: pointType
    };
}

/**
 * 平面扫描算法求线段交点
 * @param points x1,y1,x2,y2...
 * @constructor
 */
export function BO(points) {
    /**
     *swap line status
     */
    let sls: BBST<SLSVal> = new BBST();
    /**
     * 事件队列
     */
    let eventQueue: PriorityQueue<EventVal> = new PriorityQueue();
    /**
     *当前检测的事件节点
     */
    let currentEventVal: EventVal = null;
    /**
     *交点集合
     */

    let result: Array<Point> = [];
    /**
     *当前slsNode的上一个节点
     */
    let prevN = null;
    /**
     *当前slsNode的下一个节点
     */
    let nextN = null;
    /**
     * 线段检测表
     * key:Linear
     * value:[]<Linear>
     */
    let intersectTestMap = new Map();
    /**
     * line 和 slsNode对应表
     * key:Linear
     * value:slsNode
     */
    let lineToSlsNodeMap = new Map();
    /**
     *当前检测节点
     */
    let currentSlsNode = null;


    let len = points.length;
    /**
     * 根据扫描线更新sls中选段withY信息
     * @param x
     */
    let updateWithY = (x) => {
        if (sls.mRoot !== null) {
            sls.mRoot.inorder((node, userData) => {
                let line = node.val.line;
                node.val.withY = line.getY(userData);
                return true;
            }, x)
        }
    };
    /**
     * 获取sls中线段和垂线的交点
     * @param x
     */
    let getIntersectionWithX = x => {
        let result = [];
        if (sls.mRoot !== null) {
            sls.mRoot.inorder((node, userData) => {
                let line = node.val.line;
                result.push(new Point(userData, line.getY(userData)));
                return true;
            }, x)
        }
        return result;
    }
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
            if (la.equal(lb, LinearType.LINE)) return;//共线，不求交点
            interSection = la.commonEndPoint(lb);

            if (interSection || (interSection = getIntersection(la, lb))) {
                assignIntersectTestMap(la, lb);
                assignIntersectTestMap(lb, la);
                eventQueue.enqueue(createEventVal([la, lb], interSection, PointType.INTERSECTION));
            }
        }
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

        if (l.isVertical()) {
            //垂线添加一个起点，处理的时候，判断是垂线，将不会添加到sls
            eventQueue.enqueue(createEventVal(l, l.p1, PointType.START));
        } else {
            eventQueue.enqueue(createEventVal(l, l.p1), createEventVal(l, l.p2));
        }
    }

    while (eventQueue.size > 0) {

        currentEventVal = eventQueue.dequeue();
        //当前线条是垂线
        if (!Array.isArray(currentEventVal.line) && currentEventVal.line.isVertical()) {
            result = result.concat(getIntersectionWithX(currentEventVal.p.x));
            continue;
        } else {
            updateWithY(currentEventVal.p.x);
        }

        switch (currentEventVal.pointType) {
            case PointType.START:
                let val: SLSVal = createSLSVal(currentEventVal.line, currentEventVal.p.y);
                currentSlsNode = sls.insert(val);
                lineToSlsNodeMap.set(currentEventVal.line, currentSlsNode);

                //插入新线段，求相邻线段的交点
                prevN = currentSlsNode.inorderPrev();
                nextN = currentSlsNode.inorderNext();
                compareSegment(currentSlsNode, prevN);
                compareSegment(currentSlsNode, nextN);
                break;
            case PointType.END:
                currentSlsNode = lineToSlsNodeMap.get(currentEventVal.line);

                //删除线段，求相邻线段交点
                prevN = currentSlsNode.inorderPrev();
                nextN = currentSlsNode.inorderNext();
                sls.removeNode(currentSlsNode);
                compareSegment(prevN, nextN);
                break;
            case PointType.INTERSECTION:

                result.push(currentEventVal.p);

                let ls = currentEventVal.line;//两条线段
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

    result.map(v => {
        v.x = Number.parseInt(v.x * 20 + '') / 20;
        v.y = Number.parseInt(v.y * 20 + '') / 20;
    });
    return result;
}


