import {BinaryTreeNode} from "./BinaryTreeNode";
import {Comparable} from "./Comparable";


export class BST<T extends Comparable> {
    mRoot: BinaryTreeNode<T> = null;
    mSize: number = 0;

    /**
     *
     * @param val
     * @return {BinaryTreeNode}
     */
    insert(val: T) {
        this.mSize++;
        if (this.mRoot == null) {
            this.mRoot = new BinaryTreeNode(val);
            return this.mRoot;
        } else {
            let t = null;
            let node = this.mRoot;
            while (node != null) {
                if (val.compare(node.val) < 0) {
                    if (node.left != null)
                        node = node.left;
                    else {
                        node.setLeft(val);
                        t = node.left;
                        break;
                    }
                } else {
                    if (node.right != null)
                        node = node.right;
                    else {
                        node.setRight(val);
                        t = node.right;
                        break;
                    }
                }
            }
            return t;
        }
    }

    get size() {
        return this.mSize;
    }

    find(val: T) {
        let node = this.mRoot;
        while (node != null) {
            let i = val.compare(node.val);
            if (i === 0) break;
            node = i < 0 ? node.left : node.right;
        }
        return node;
    }

    remove(val) {
        if (this.mSize === 0) return false;

        let s = this.mRoot.size;
        let found = false;
        while (s > 0) {
            let node = this.find(val);
            if (node == null) break;
            if (!this.removeNode(node)) break;
            found = true;
            s--;
        }
        return found;
    }

    removeNode(node) {
        //要删除的node如果只有一个子节点，那么用这个子节点替换node的位置
        //如果没有子节点，则直接删除

        if (node.left == null || node.right == null) {
            let child = null;
            if (node.left != null) child = node.left;
            if (node.right != null) child = node.right;
            if (node.parent == null)
                this.mRoot = child;
            else {
                if (node === node.parent.left)
                    node.parent.left = child;
                else
                    node.parent.right = child;
            }

            if (child != null) child.parent = node.parent;
            node.left = null;
            node.right = null;
            node = null;
        }

        //如果两个子节点都在，则找到左子树中最大的点替换node位置
        else {
            let l = node.left;
            while (l.right != null) l = l.right;

            //node左子树就是那个最大的点
            if (node.left === l) {
                l.right = node.right;
                l.right.parent = l;
            } else {
                l.parent.right = l.left;
                if (l.left != null) l.left.parent = l.parent;
                l.left = node.left;
                l.left.parent = l;
                l.right = node.right;
                l.right.parent = l;
            }

            if (node.parent == null)
                this.mRoot = l;
            else {
                if (node === node.parent.left)
                    node.parent.left = l;
                else
                    node.parent.right = l;
            }

            l.parent = node.parent;
            node.left = null;
            node.right = null;
            node = null;
        }
        if (--this.mSize === 0) this.mRoot = null;

        return true;
    }

    isEmpty() {
        return this.size == 0;
    }

    toString() {
        let b = '';
        b += `[ BST size=${this.size}`;
        if (this.isEmpty()) {
            b += " ]";
            return b.toString();
        }
        b += "\n";
        this.mRoot.inorder(function (node, _) {
            b += "  ";
            b += node.val;
            b += "\n";
            return true;
        }, '');
        b += "]";
        return b.toString();
    }

}