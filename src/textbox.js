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
            eventType: "focus"
        });

        this._buildVNodes();
    }

    _buildVNodes() {
        this._vNode.addChildNode(new VNode({
            nodeName: "ol",
            attrs: {
                class: "c-textbox__list",
                nodeKey: "editor-list"
            }
        }).vNode());
    }

    getTopic() {
        return this._props.eventTopic;
    }

    getVNode() {
        return this._vNode.vNode();
    }
}