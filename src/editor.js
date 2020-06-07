import { findElement, log } from "./utils";
import TextArea from "./textarea";

export default class Editor {
    constructor(options) {
        this._root = null;
        this._tag = "Script Editor v1";
        this._textarea = new TextArea();
    }

    mount(element) {
        try {
            this._root = this._invalidateMountElement(
                findElement(element)
            );

            this._setup();
        } catch (ex) {
            log(ex, this._tag);
        }
    }

    unmount() {}

    _setup() {
        // create some nodes for textarea
        this._textarea.createVNodes();
        this._textarea.apply(this._root);
    }

    _invalidateMountElement(el) {
        if (!el) {
            throw new Error("Mount element not found");
        }

        if (el.childNodes.length) {
            throw new Error("Mount element cannot have any pre-existing nodes");
        }

        return el;
    }
}