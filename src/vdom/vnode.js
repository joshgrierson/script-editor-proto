import { genUuid } from "../utils";

export default class VNode {
    constructor(config) {
        const {
            nodeName,
            attrs,
            text
        } = config;

        this._nodeMap = {
            id: genUuid(),
            nodeName,
            attrs,
            text,
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