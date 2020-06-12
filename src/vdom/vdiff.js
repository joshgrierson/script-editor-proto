export default function (newVNode, oldVNode, hint) {
    const diffTree = [];

    if (hint || hint == 0) {
        const newVChildNode = newVNode.children[hint];
        const oldVChildNode = oldVNode.children[hint];

        if (!oldVChildNode) {
            diffTree.push({
                action: "add",
                vNode: newVChildNode
            });
        }
    } else if (!oldVNode) {
        diffTree.push({
            action: "add",
            vNode: newVNode
        });
    }

    return diffTree;
}