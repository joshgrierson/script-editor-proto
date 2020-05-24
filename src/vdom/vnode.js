import { genUuid } from "../utils";

export default class VNode {
    constructor(config) {
        const {
            nodeName,
            attrs,
            text,
            eventType
        } = config;

        this._nodeMap = {
            id: genUuid(),
            nodeName,
            attrs,
            text,
            eventType,
            children: []
        };
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