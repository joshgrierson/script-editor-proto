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