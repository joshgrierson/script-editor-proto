import VNode from "./vdom/vnode";
import patch, { vTreeSnapshot } from "./vdom/vpatch";
import diff from "./vdom/vdiff";
import { registerEvents } from "./vdom/vdom";

/**
 * TextArea object for rendering text area and child nodes,
 * aswell as handling updates to them.
 */
export default class TextArea {
    constructor(data, cache, observer, listeners) {
        this.root = null;
        this.list = null;
        this._data = data;
        this._cache = cache;
        this._observer = observer;
        this._listeners = listeners;
    }

    createVNodes() {
        this.root = new VNode({
            nodeName: "div",
            attrs: {
                contenteditable: true,
                class: "c-textbox"
            },
            nativeEvents: ["focus", "click", "keydown"]
        });

        this.list = new VNode({
            nodeName: "ol",
            attrs: {
                class: "c-textbox__list"
            }
        });

        this.root.addNode(this.list);
    }

    addTextLine(text) {
        const nextIdx = this.list.node.children.length;

        const oldVList = vTreeSnapshot(this.list.node);

        const vLineNode = new VNode({
            nodeName: "li",
            attrs: {
                class: "c-textbox__line"
            }
        });

        this.list.addNode(vLineNode.addNode(text));

        const patches = diff(this.list.node, oldVList, nextIdx);
        
        patch(this.list.node.ref, patches, "all");
    }

    updateTextLine(text) {
        // console.log("update me with: %s", text);
    }

    removeTextLine(idx) {
        const oldVList = vTreeSnapshot(this.list.node);

        this.list.removeNode(idx);

        patch(this.list.node.ref,
            diff(this.list.node, oldVList, idx));
    }

    apply($root) {
        const patches = diff(this.root.node);

        patch($root, patches, "all");

        registerEvents({
            $node: this.root.node.ref,
            vNode: this.root.node,
            observer: this._observer,
            listeners: this._listeners
        });
    }
}