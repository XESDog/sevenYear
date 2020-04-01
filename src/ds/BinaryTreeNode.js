"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BinaryTreeNode = /** @class */ (function () {
    function BinaryTreeNode(val) {
        this.val = val;
        this.parent = this.left = this.right = null;
    }
    Object.defineProperty(BinaryTreeNode.prototype, "size", {
        get: function () {
            var c = 1;
            if (this.hasLeft())
                c += this.left.size;
            if (this.hasRight())
                c += this.right.size;
            return c;
        },
        enumerable: true,
        configurable: true
    });
    BinaryTreeNode.prototype.preorder = function (process, userData) {
        this.preorderRecursive(this, process, userData);
    };
    BinaryTreeNode.prototype.preorderRecursive = function (node, process, userData) {
        var run = process(node, userData);
        if (run && node.hasLeft())
            run = this.preorderRecursive(node.left, process, userData);
        if (run && node.hasRight())
            run = this.preorderRecursive(node.right, process, userData);
        return run;
    };
    BinaryTreeNode.prototype.inorder = function (process, userData) {
        this.inorderRecursive(this, process, userData);
    };
    BinaryTreeNode.prototype.inorderRecursive = function (node, process, userData) {
        if (node.hasLeft())
            if (!this.inorderRecursive(node.left, process, userData))
                return false;
        if (!process(node, userData))
            return false;
        if (node.hasRight())
            if (!this.inorderRecursive(node.right, process, userData))
                return false;
        return true;
    };
    BinaryTreeNode.prototype.hasLeft = function () {
        return this.left != null;
    };
    BinaryTreeNode.prototype.setLeft = function (val) {
        if (this.left == null) {
            this.left = new BinaryTreeNode(val);
            this.left.parent = this;
        }
        else
            this.left.val = val;
        return this;
    };
    BinaryTreeNode.prototype.hasRight = function () {
        return this.right != null;
    };
    BinaryTreeNode.prototype.setRight = function (val) {
        if (this.right == null) {
            this.right = new BinaryTreeNode(val);
            this.right.parent = this;
        }
        else
            this.right.val = val;
        return this;
    };
    return BinaryTreeNode;
}());
exports.BinaryTreeNode = BinaryTreeNode;
//# sourceMappingURL=BinaryTreeNode.js.map