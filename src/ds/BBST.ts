import {BST,} from "./BST";
import {Comparable} from "./Comparable";
import {BinaryTreeNode} from "./BinaryTreeNode";

export class BBST<T extends Comparable> extends BST<T> {
    insert(val: T): BinaryTreeNode<T> {
        let node = super.insert(val);
        let p = node.parent;
        let intercept = 0;
        /**
         * 获取左右节点的高度差
         * @param n
         */
        let getNodeIntercept = (n) => {
            let lh = 0, rh = 0;
            if (n.hasLeft()) lh = n.left.height();
            if (n.hasRight()) rh = n.right.height();
            return rh - lh;//右子树高为正值，左子树高则为负值
        };
        while (p != null) {
            intercept = getNodeIntercept(p);
            if (Math.abs(intercept) > 1) break;
            p = p.parent;
        }
        if (p) {
            let sonIntercept = 0;
            if (intercept > 0) {
                sonIntercept = getNodeIntercept(p.right);
                if (sonIntercept > 0) {//右右结构，需要左旋
                    this.leftRotate(p);
                } else {//右左结构，需要右旋再左旋
                    this.rightRotate(p.right);
                    this.leftRotate(p);
                }
            } else if (intercept < 0) {
                sonIntercept = getNodeIntercept(p.left);
                if (sonIntercept > 0) {//左右结构，需要左旋再右旋
                    this.leftRotate(p.left);
                    this.rightRotate(p);
                } else {//左左结构，需要右旋
                    this.rightRotate(p)
                }
            }
        }
        return node;
    }

    leftRotate(node: BinaryTreeNode<T>) {
        let nodeParent = node.parent;
        let nodeRight = node.right;
        let nodeRightLeft = node.right.left;

        nodeRight.parent = nodeParent;
        if (nodeParent) {
            if (node.isLeft()) nodeParent.left = nodeRight;
            if (node.isRight()) nodeParent.right = nodeRight;
        }
        node.parent = nodeRight;
        nodeRight.left = node;
        node.right = nodeRightLeft;//如果不存在，需要置为空，因此，能不能放到下面的if判断中
        if (nodeRightLeft) {
            nodeRightLeft.parent = node;
        }
        if (nodeRight.isRoot()) this.mRoot = nodeRight;
    }

    rightRotate(node: BinaryTreeNode<T>) {
        let nodeParent = node.parent;
        let nodeLeft = node.left;
        let nodeRightLeft = node.left.right;

        nodeLeft.parent = nodeParent;
        if (nodeParent) {
            if (node.isLeft()) nodeParent.left = nodeLeft;
            if (node.isRight()) nodeParent.right = nodeLeft;
        }
        node.parent = nodeLeft;
        nodeLeft.right = node;
        node.left = nodeRightLeft;
        if (nodeRightLeft) {
            nodeRightLeft.parent = node;
        }

        if (nodeLeft.isRoot()) this.mRoot = nodeLeft;
    }

    toString(): string {
        let b = '';
        b += `[ BBST size=${this.size}`;
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