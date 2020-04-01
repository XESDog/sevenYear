import {BST} from "../src/ds/BST";

test('Bst', () => {
    let bst = new BST()
    bst.insert(1)
    bst.insert(5)
    bst.insert(3)
    bst.insert(4)
    bst.insert(2)
    bst.insert(6)
    bst.insert(10)
    bst.insert(8)
    bst.insert(9)
    bst.insert(7)
    console.log(bst.mRoot.toString())
})