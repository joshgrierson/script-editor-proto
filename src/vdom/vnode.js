import { genUuid } from "../utils";

export default class VNode {
    constructor(props) {
        this._props = {
            id: genUuid(),
            ref: null,
            nodeName: props.nodeName,
            attrs: props.attrs,
            nativeEvents: [],
            children: []
        };

        if (props.nativeEvents) {
            this._props.nativeEvents = props.nativeEvents;
        }
    }

    addEvent(event) {
        if (!this._props.nativeEvents.includes(event)) {
            this._props.nativeEvents.push(event);
        }
    }

    addNode(vNode) {
        this._props.children.push(
            typeof vNode == "string" ? vNode : vNode.node
        );
        return this;
    }

    removeNode(idx) {
        if (this._props.children[idx]) {
            this._props.children.splice(idx, 1);
        }

        return this;
    }

    get node() {
        return this._props;
    }
}