import createElement from "./vdom";

export default function diffTree(newTree, oldTree) {
    if (!oldTree) {
        return createElement(newTree);
    }

    if (typeof newTree == "string" && typeof oldTree === "string") {
        if (newTree !== oldTree) {
            return ($node) => {
                $node.replaceChild(
                    createElement(newTree),
                    createElement(oldTree)
                );
            };
        }
    }

    if (newTree.nodeName !== oldTree.nodeName) {
        return ($node) => {
            $node.appendChild(createElement(newTree));
        };
    }
}

export function findTextNode(tree) {
    let foundNode;

    const walk = (nodes) => {        
        if (!nodes.length) {
            return;
        }

        const half = Math.ceil(nodes.length/2);
        const left = nodes.slice(0, half);
        const right = nodes.slice(half, nodes.length);

        const proc = (side) => {
            side.forEach(function(node) {
                if (typeof node == "string") {
                    foundNode = node;
                } else {
                    walk(node.children);
                }
            });
        };

        if (left.length) {
            proc(left);
        }

        if (!foundNode && right.length) {
            proc(right);
        }
    };

    walk(tree.children);

    return foundNode;
}