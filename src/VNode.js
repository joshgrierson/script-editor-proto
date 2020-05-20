import { genUuid } from "./utils";

export function VNode(nodeName, attrs, text, childNode) {
    const nodeMap = {
        id: genUuid(),
        nodeName,
        attrs,
        text,
        children: {}
    };

    if (childNode) {
        if (typeof childNode === "object" && Array.isArray(childNode)) {
            nodeMap.children = childNode.reduce(function(acc, cNode) {
                acc[genUuid()] = cNode;
                return acc;
            }, {});
        } else {
            nodeMap.children = {
                [genUuid()]: childNode
            }
        }
    }

    return nodeMap;
}