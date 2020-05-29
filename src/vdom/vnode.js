import { genUuid } from "../utils";
import Topics from "../topics";
import Container from "typedi";

export default class VNode {
    constructor(config) {
        const {
            nodeName,
            attrs,
            nativeEvents,
            topics
        } = config;

        this._nodeMap = {
            id: genUuid(),
            nodeName,
            attrs,
            nativeEvents,
            topics,
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