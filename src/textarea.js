import VNode from "./vdom/vnode";
import { createElement } from "./vdom/vdom";

export default class TextArea {
    constructor() {
        this.root = null;
        this.list = null;
    }

    createVNodes() {
        this.root = new VNode({
            nodeName: "div",
            attrs: {
                contenteditable: true,
                class: "c-textbox"
            }
        });

        this.list = new VNode({
            nodeName: "ol",
            attrs: {
                class: "c-textbox__list"
            }
        });

        this.root.addNode(this.list);
    }

    apply($root) {
        $root.appendChild(
            createElement(this.root.node)
        );
    }
}