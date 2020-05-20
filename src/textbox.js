import ElementAbstract from "./element";
import Topics from "./topics";
import "./styles/_textbox.scss";

export default class TextBox extends ElementAbstract {
    constructor(props, observables, vTree) {
        super("textbox", observables);

        this._props = props;
        this._vTree = vTree;
        this._observables = observables;

        this._vNode = this.createVNode({
            nodeName: "div",
            attrs: {
                class: "c-textbox",
                contenteditable: true,
                nodeKey: "editor-container"
            }
        });
    }

    registerEvents() {
        // this.registerEvent(
        //     this._rootElement,
        //     this._props.eventTypes.KEYUP,
        //     (ev) => this.notifySubscribers(Topics.onEditChange, ev)
        // );
    }
}