import VNode from "./vdom/vnode";
import ElementAbstract from "./element";
import "./styles/_textbox.scss";

export default class TextBox extends ElementAbstract {
    constructor(props) {
        super("textbox");

        this._props = props;

        this._vNode = new VNode({
            nodeName: "div",
            attrs: {
                class: "c-textbox",
                contenteditable: true,
                nodeKey: "editor-container"
            },
            nativeEvents: ["focus", "keydown"],
            topics: this._props.topics
        });

        this._buildVNodes();
    }

    _buildVNodes() {
        const ol = new VNode({
            nodeName: "ol",
            attrs: {
                class: "c-textbox__list",
                nodeKey: "editor-list"
            }
        });

        ol.addChildNode(new VNode({
            nodeName: "li",
            text: "Hello"
        }).vNode());

        this._vNode.addChildNode(ol.vNode());
    }

    getVNode() {
        return this._vNode.vNode();
    }
}