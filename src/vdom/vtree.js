import createElement from "./vdom";

function findNodeChildren(vTree, oldTree, nodeName, fn) {
    if (vTree.nodeName == nodeName && oldTree.nodeName == nodeName) {

        if (vTree.children.length) {
            fn(vTree.children, oldTree.children);
        }
    } else if (vTree.children.length) {

        for(let i = 0; i < vTree.children.length; i++) {
            findNodeChildren(
                vTree.children[i],
                oldTree.children[i],
                nodeName,
                fn
            );
        }
    }
}

export default function diffTree(newTree, oldTree, hint) {
    const {
        nodeIndex,
        parentNode
    } = hint;

    findNodeChildren(newTree, oldTree, parentNode, (newNodes, oldNodes) => {
        console.log(newNodes, oldNodes);
    });

    if (!oldTree) {
        return ($node) => {
            $node.appendChild(
                createElement(newTree)
            );

            return $node;
        };
    }

    if (typeof newTree == "string" && typeof oldTree === "string") {
        if (newTree !== oldTree) {
            return ($node) => {
                $node.replaceChild(
                    createElement(newTree),
                    createElement(oldTree)
                );

                return $node;
            };
        }
    }

    if (newTree.nodeName !== oldTree.nodeName) {
        return ($node) => {
            $node.appendChild(createElement(newTree));
            return $node;
        };
    }
}