export class PriorityQueue<T extends Prioritizable> {
    mData: Array<T>=[];

    enqueue(...val: Array<T>) {
        this.mData.push(...val);
        this.sort();
    }

    dequeue(): T {
        return this.mData.shift();
    }

    sort() {
        this.mData.sort((a, b) => a.priority - b.priority)
    }

    toString() {
        let s = `[PriorityQueue \n`;
        let len = this.mData.length;
        for (let i = 0; i < len; i++) {
            s += "  " + this.mData[i].toString() + '\n';
        }
        s += '\n]';
        return s;
    }

    get size() {
        return this.mData.length;
    }
}