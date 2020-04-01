"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 点c是否在直线ab的左侧（右手定则）
 * @param a
 * @param b
 * @param c
 * @return {number}
 */
function toLeft(a, b, c) {
    return a.x * b.y - a.y * b.x
        + b.x * c.y - b.y * c.x +
        +c.x * a.y - c.y * a.x;
}
exports.toLeft = toLeft;
//# sourceMappingURL=toLeft.js.map