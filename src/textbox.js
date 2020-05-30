import VNode from "./vdom/vnode";
import { addChildToNode } from "./vdom/vtree";
import "./styles/_textbox.scss";

export default class TextBox {
    constructor(props) {
        this._props = props;
        this._routes = {};
        this._olNodeIndex = 0;
        
        this._buildVNodes();
    }

    _rootVNode() {
        return new VNode({
            nodeName: "div",
            attrs: {
                class: "c-textbox",
                contenteditable: true,
                dataNodeKey: "editor-container"
            },
            nativeEvents: Object.keys(this._props.topics),
            topics: this._props.topics
        });
    }

    _buildVNodes() {
        this._root = this._rootVNode();

        this._olNodeIndex = 1;
        this._root.addChildNode(new VNode({
            nodeName: "ol",
            attrs: {
                class: "c-textbox__list",
                dataNodeKey: "editor-list"
            }
        }).vNode());
    }

    updateText(newText, uid) {
        if (!uid) {
            
        }
    }

    addTextLine(text) {
        const li = new VNode({
            nodeName: "li",
            attrs: {
                dataNodeKey: "editor-list-line"
            }
        });

        li.addChildNode(text);

        this._root.vNode()
            .children[0]
            .children.push(li.vNode());
    }

    vNode() {
        return this._root.vNode();
    }
}