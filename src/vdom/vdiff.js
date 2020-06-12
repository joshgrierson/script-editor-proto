/**
 * Runs a simple diff algor on two vTree's.
 * Hint arg is used for targeting vNode by index
 * @param {VNode} newVNode 
 * @param {VNode} oldVNode 
 * @param {number} hint 
 */
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
        } else if (!newVChildNode) {
            diffTree.push({
                action: "remove",
                vNode: oldVChildNode
            });
        } else if (newVChildNode.id !== oldVChildNode.id) {
            diffTree.push({
                action: "replace",
                vNode: newVChildNode,
                oldVNode: oldVChildNode
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