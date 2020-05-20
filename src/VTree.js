import { genUuid } from "./utils";

export default class VTree {
    constructor() {
        this._vDomTree = {};
    }

    addNode(vNode) {
        this._vDomTree.children[genUuid()] = vNode;
    }

    patch() {}
}