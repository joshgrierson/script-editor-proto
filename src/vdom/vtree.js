import createElement from "./vdom";

export default function diffTree(newTree, oldTree) {
    if (newTree.nodeName === oldTree.nodeName) {
        return createElement(newTree);
    }
}

export function isTextEmpty(vTree) {
    let noText = true;

    const isEmpty = (text) => (!text || text.trim().length == 0);

    const walk = (nodes) => {
        const half = Math.round(nodes.length / 2);
        const left = nodes.slice(0, half);
        const right = nodes.slice(half, nodes.length);
    };

    if (!isEmpty(vTree.text)) {
        noText = false;
    } else if (vTree.children.length > 0) {
        walk(vTree.children);
    }

    return noText;
}