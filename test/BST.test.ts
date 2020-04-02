import {BST} from "../src/ds/BST";
import {Comparable} from "../src/ds/Comparable";
import {BinaryTreeNode} from "../src/ds/BinaryTreeNode";

class Element implements Comparable {
    val;

    constructor(val) {
        this.val = val;
    }

    compare(other): number {
        return this.val - other.val;
    }

    toString() {
        return this.val;
    }
}


test('BST construct', () => {

    let bst = new BST();
    expect(bst.mRoot).toBeNull()
    expect(bst.mSize).toBe(0);

})

test('BST insert', () => {
    let bst = new BST();
    bst.insert(new Element(1));
    expect(bst.mRoot).toBeDefined()
    expect(bst.mRoot).toBeInstanceOf(BinaryTreeNode)
    expect(bst.mRoot.val).toBeInstanceOf(Element)
    expect(bst.mRoot.val['val']).toBe(1);
    expect(bst.mRoot.left).toBeNull()
    expect(bst.mRoot.right).toBeNull()
    expect(bst.mRoot.parent).toBeNull()
    expect(bst.mSize).toBe(1);

    let node = bst.insert(new Element(2));

    expect(bst.mSize).toBe(2);
    expect(bst.mRoot.right).toBeDefined();
    expect(bst.mRoot.right.val['val']).toBe(2);
    expect(bst.mRoot === node.parent).toBeTruthy();


    node = bst.insert(new Element(0));
    expect(bst.mRoot.left).toBeDefined();
    expect(bst.mRoot.left.val['val']).toBe(0);
    expect(bst.mRoot === node.parent).toBeTruthy();

})
