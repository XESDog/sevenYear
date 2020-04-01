"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BinaryTreeNode_1 = require("./BinaryTreeNode");
var BST = /** @class */ (function () {
    function BST() {
        this.mRoot = null;
        this.mSize = 0;
    }
    /**
     *
     * @param val
     * @return {BinaryTreeNode}
     */
    BST.prototype.insert = function (val) {
        this.mSize++;
        if (this.mRoot == null) {
            this.mRoot = new BinaryTreeNode_1.BinaryTreeNode(val);
            return this.mRoot;
        }
        else {
            var t = null;
            var node = this.mRoot;
            while (node != null) {
                if (val - node.val < 0) {
                    if (node.left != null)
                        node = node.left;
                    else {
                        node.setLeft(val);
                        t = node.left;
                        break;
                    }
                }
                else {
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
    };
    Object.defineProperty(BST.prototype, "size", {
        get: function () {
            return this.mSize;
        },
        enumerable: true,
        configurable: true
    });
    BST.prototype.find = function (val) {
        var node = this.mRoot;
        while (node != null) {
            var i = val - node.val;
            if (i === 0)
                break;
            node = i < 0 ? node.left : node.right;
        }
        return node;
    };
    BST.prototype.remove = function (val) {
        if (this.mSize === 0)
            return false;
        var s = this.mRoot.size;
        var found = false;
        while (s > 0) {
            var node = this.find(val);
            if (node == null)
                break;
            if (!this.removeNode(node))
                break;
            found = true;
            s--;
        }
        return found;
    };
    BST.prototype.removeNode = function (node) {
        //要删除的node如果只有一个子节点，那么用这个子节点替换node的位置
        //如果没有子节点，则直接删除
        if (node.left == null || node.right == null) {
            var child = null;
            if (node.left != null)
                child = node.left;
            if (node.right != null)
                child = node.right;
            if (node.parent == null)
                this.mRoot = child;
            else {
                if (node === node.parent.left)
                    node.parent.left = child;
                else
                    node.parent.right = child;
            }
            if (child != null)
                child.parent = node.parent;
            node.left = null;
            node.right = null;
            node = null;
        }
        //如果两个子节点都在，则找到左子树中最大的点替换node位置
        else {
            var l = node.left;
            while (l.right != null)
                l = l.right;
            //node左子树就是那个最大的点
            if (node.left === l) {
                l.right = node.right;
                l.right.parent = l;
            }
            else {
                l.parent.right = l.left;
                if (l.left != null)
                    l.left.parent = l.parent;
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
        if (--this.mSize === 0)
            this.mRoot = null;
        return true;
    };
    return BST;
}());
exports.BST = BST;
//# sourceMappingURL=BST.js.map