import VNode from "./vdom/vnode";
import patch, { vTreeSnapshot } from "./vdom/vpatch";
import defineReactive from "./observer/reactive";

export default class TextArea {
    constructor(data, cache, observer) {
        this.root = null;
        this.list = null;
        this._eventMap = {};
        this._data = data;
        this._cache = cache;
        this._observer = observer;
    }

    mapEvents(eventMap) {
        this._eventMap = eventMap;
    }

    createVNodes() {
        this.root = new VNode({
            nodeName: "div",
            attrs: {
                contenteditable: true,
                class: "c-textbox"
            },
            nativeEvents: Object.keys(this._eventMap)
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
    }

    apply($root, isListNodes) {
        const vTree = vTreeSnapshot(
            isListNodes
            ? this.list.node
            : this.root.node
        );

        const opts = {
            eventMap: this._eventMap
        };

        if (!isListNodes) {
            opts.createRefCond = {
                key: "id",
                value: this.list.node.id
            };
        }

        patch($root, vTree, null, opts);
    }
}