export class BinaryTreeNode<T> {
    parent: BinaryTreeNode<T>;
    left: BinaryTreeNode<T>;
    right: BinaryTreeNode<T>;
    val: T;

    constructor(val: T) {
        this.val = val;
        this.parent = this.left = this.right = null;
    }

    get size() {
        let c = 1;
        if (this.hasLeft()) c += this.left.size;
        if (this.hasRight()) c += this.right.size;
        return c;
    }

    preorder(process, userData) {
        this.preorderRecursive(this, process, userData);
    }

    /**
     * 先根次序遍历
     * @param node
     * @param process
     * @param userData
     */
    preorderRecursive(node, process, userData) {
        let run = process(node, userData);
        if (run && node.hasLeft()) run = this.preorderRecursive(node.left, process, userData);
        if (run && node.hasRight()) run = this.preorderRecursive(node.right, process, userData);
        return run;
    }

    /**
     * 中根次序遍历
     * @param process
     * @param userData
     */
    inorder(process, userData) {
        this.inorderRecursive(this, process, userData)
    }

    inorderRecursive(node, process, userData) {
        if (node.hasLeft())
            if (!this.inorderRecursive(node.left, process, userData))
                return false;
        if (!process(node, userData)) return false;
        if (node.hasRight())
            if (!this.inorderRecursive(node.right, process, userData))
                return false;
        return true;
    }

    inorderPrev() {
        if (!this) return null;
        if (this.left) {
            let l = this.left;
            while (l.right) {
                l = l.right;
            }
            return l;
        } else {
            let q: BinaryTreeNode<T> = this;
            let p: BinaryTreeNode<T> = q.parent;
            while (p && p.right !== q) {
                q = p;
                p = p.parent;
            }
            if (p == this) return null;
            return p;
        }
    }

    inorderNext() {
        if (!this) return null;
        if (this.right) {
            let r = this.right;
            while (r.left) {
                r = r.left;
            }
            return r;
        } else {
            let q: BinaryTreeNode<T> = this;
            let p: BinaryTreeNode<T> = q.parent;
            while (p && p.left !== q) {
                q = p;
                p = p.parent;
            }
            if (p == this) return null;
            return p;
        }
    }

    hasLeft(): boolean {
        return this.left != null
    }

    setLeft(val: T): BinaryTreeNode<T> {
        if (this.left == null) {
            this.left = new BinaryTreeNode(val);
            this.left.parent = this;
        } else
            this.left.val = val;
        return this;
    }

    isLeft(): boolean {
        if (this.parent == null)
            return false;
        else
            return this.parent.left == this;
    }

    hasRight(): boolean {
        return this.right != null;
    }

    setRight(val: T): BinaryTreeNode<T> {
        if (this.right == null) {
            this.right = new BinaryTreeNode(val);
            this.right.parent = this;
        } else
            this.right.val = val;
        return this;
    }

    isRight(): boolean {
        if (this.parent == null)
            return false;
        else
            return this.parent.right == this;
    }

    isLeaf(): boolean {
        return this.left == null && this.right == null;
    }

    isRoot(): boolean {
        return this.parent == null;
    }

    contains(val: T): boolean {
        let stack = [];
        stack[0] = this;
        let c = 1;
        let found = false;
        while (c > 0) {
            let node = stack[--c];
            if (node.val == val) {
                found = true;
                break;
            }
            if (node.hasLeft()) stack[c++] = node.left;
            if (node.hasRight()) stack[c++] = node.right;
        }
        return found;
    }

    depth(): number {
        let node = this.parent;
        let c = 0;
        while (node != null) {
            node = node.parent;
            c++;
        }
        return c;
    }

    height(): number {
        return 1 + Math.max((this.left != null ? this.left.height() : 0), this.right != null ? this.right.height() : 0);
    }

    unlink(): BinaryTreeNode<T> {
        if (parent != null) {
            if (this.isLeft()) this.parent.left = null;
            else if (this.isRight()) this.parent.right = null;
            parent = null;
        }
        this.left = this.right = null;
        return this;
    }

    remove(val: T): boolean {
        let found = false;
        if (this.val == val) {
            this.unlink();
            found = true;
        }

        if (this.hasLeft()) found = found || this.left.remove(val);
        if (this.hasRight()) found = found || this.right.remove(val);
        return found;
    }

    toString() {
        let b = '';
        b += `[ BinaryTree val=${this.val} size=${this.size} depth=${this.depth()} height=${this.height()}`;
        if (this.size == 1) {
            b += " ]";
            return b;
        }
        b += "\n";
        let f = function (node, userData) {
            let d = node.depth();
            let t = "";
            for (let i = 0; i <= d; i++) {
                if (i == d - 1)
                    t += (node.isLeft() ? "L" : "R") + "---";
                else
                    t += "|   ";
            }

            t = "  " + t;
            b += t + node.val + "\n";
            return true;
        };
        this.preorder(f, "");
        b += "]";
        return b.toString();
    }

}