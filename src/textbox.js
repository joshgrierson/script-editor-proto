import h from "hyperscript";
import { genUuid } from "./utils";
import ElementAbstract from "./element";
import Topics from "./topics";
import "./styles/_textbox.scss";

export default class TextBox extends ElementAbstract {
    constructor(props, observables) {
        super("textbox", observables);

        this._props = props;
        this._observables = observables;

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
        this.registerEvent(
            this._rootElement,
            this._props.eventTypes.KEYUP,
            (ev) => this.notifySubscribers(Topics.onEditChange, ev)
        );
    }

    _root(fn) {
        return h(`.${this._classMap.root}`, {
            attrs: {
                contenteditable: true,
                nodeKey: "root"
            }
        }, h(`ol.${this._classMap.lineList}`));
    }
}