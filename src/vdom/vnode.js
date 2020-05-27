import { genUuid } from "../utils";

export default class VNode {
    constructor(config, nodeIndex, route) {
        const {
            nodeName,
            attrs,
            text,
            nativeEvents,
            topics
        } = config;

        this._nodeMap = {
            id: genUuid(),
            nodeName,
            attrs,
            text,
            nativeEvents,
            topics,
            children: []
        };

        if (text && nodeIndex && route) {
            route.push(nodeIndex);
        }

        nodeIndex += 0;
    }

    vNode() {
        return this._nodeMap;
    }

    addChildNode(vNode) {
        this._nodeMap.children.push(vNode);
    }

    addChildNodes(vNodes) {
        vNodes.forEach((vNode) => {
            this._nodeMap.children.push(vNode);
        })
    }
}