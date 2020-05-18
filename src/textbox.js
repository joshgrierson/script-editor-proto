import h from "hyperscript";
import { genUuid } from "./utils";
import ElementAbstract from "./element";
import "./styles/_textbox.scss";

export default class TextBox extends ElementAbstract {
    constructor(props) {
        super("textbox");

        this._props = props;
        this._classMap = {
            root: `c-${this.namespace}`,
            lineList: `c-${this.namespace}__l-list`
        };
        this._idMap = {};
        this.UUID = genUuid();
    }

    init() {
        this._rootElement = this._root();
    }

    render() {
        return this._rootElement;
    }

    registerEvents() {
        this.registerEvent(this._rootElement, this._props.eventTypes.KEYUP, this._handleKeyEvent);
    }

    _root() {
        return h(`.${this._classMap.root}`, {
            attrs: {
                contenteditable: true,
                nodeKey: "root"
            }
        }, h(`ol.${this._classMap.lineList}`));
    }

    _handleKeyEvent(ev) {
        console.log(ev);
    }
}