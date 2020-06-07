import { genUuid } from "../utils";

export default class VNode {
    constructor(props) {
        this._props = {
            id: genUuid(),
            nodeName: props.nodeName,
            attrs: props.attrs,
            children: []
        };
    }

    addNode(vNode) {
        this._props.children.push(vNode.node);
        return this;
    }

    get node() {
        return this._props;
    }
}