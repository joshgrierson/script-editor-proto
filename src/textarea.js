import VNode from "./vdom/vnode";
import patch, { vTreeSnapshot } from "./vdom/vpatch";
import diff from "./vdom/vdiff";
import defineReactive from "./observer/reactive";
import { registerEvents } from "./vdom/vdom";

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
            nativeEvents: ["focus"]
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

        defineReactive({
            data: this._data,
            key: nextIdx,
            observer: this._observer,
            cache: this._cache
        });

        this._data[nextIdx] = text;

        this.list.addNode(vLineNode.addNode(text));

        const patches = diff(this.list.node, oldVList, nextIdx);
        
        patch(this.list.node.ref, patches);
    }

    apply($root) {
        const patches = diff(this.root.node);

        patch($root, patches, [
            {
                key: "id",
                value: this.root.node.id
            },
            {
                key: "id",
                value: this.list.node.id
            }
        ]);

        registerEvents({
            $node: this.root.node.ref,
            vNode: this.root.node,
            observer: this._observer,
            listeners: this._listeners
        });
    }
}