import VNode from "./vdom/vnode";
import "./styles/_textbox.scss";

export default class TextBox {
    constructor(props) {
        this._props = props;
        this._routes = {};
        
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
        const ol = new VNode({
            nodeName: "ol",
            attrs: {
                class: "c-textbox__list",
                dataNodeKey: "editor-list"
            }
        });

        const li = new VNode({
            nodeName: "li",
            attrs: {
                dataNodeKey: "editor-list-line"
            }
        }).vNode();
        
        ol.addChildNode(li);

        this._routes[li.id] = li;
        this._root.addChildNode(ol.vNode());
    }

    updateText(newText, uid) {
        if (!uid) {
            
        }
    }

    vNode() {
        return this._root.vNode();
    }
}