export interface Comparable {
    /**
     * 与之比较的对象返回number
     * 0：表示相等
     * 1：表示this>other
     * -1:表示other>this
     * @param other
     */
    compare(other): number;
}