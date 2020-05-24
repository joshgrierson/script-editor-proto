import createElement from "./vdom";

export default function diffTree(newTree, oldTree) {
    if (newTree.nodeName === oldTree.nodeName) {
        return createElement(newTree);
    }
}