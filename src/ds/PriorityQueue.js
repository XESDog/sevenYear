"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue() {
        this.mData = [];
    }
    PriorityQueue.prototype.enqueue = function (val) {
        this.mData.push(val);
        this.sort();
    };
    PriorityQueue.prototype.dequeue = function () {
        this.mData.shift();
    };
    PriorityQueue.prototype.sort = function () {
        this.mData.sort(function (a, b) { return a.priority - b.priority; });
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=PriorityQueue.js.map