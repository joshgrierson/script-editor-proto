import { findElement, log, isDev } from "./utils";
import TextArea from "./textarea";
import Observer from "./observer";

export default class Editor {
    constructor(options) {
        this._root = null;
        this._tag = "Script Editor v1";

        this._data = {};
        this._cache = {};

        this._observer = new Observer();
        this._textarea = new TextArea(
            this._data,
            this._cache,
            this._observer
        );
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
        this._registerObservables();

        // create some nodes for textarea
        this._textarea.mapEvents({
            "focus": (vNode, ev) => this._observer.notify("editor-focus", vNode)
        });
        this._textarea.createVNodes();
        this._textarea.apply(this._root);

        this._initState();
    }

    _initState() {
        this._textarea.addTextLine("");
    }

    _registerObservables() {
        this._observer.subscribe(
            "editor-focus",
            this._handleEditorFocus.bind(this)
        );

        this._observer.subscribe(
            "state-change",
            this._handleStateChange.bind(this)
        );
    }

    /**
     * Invoked on editor focus event
     * @param {VNode} vNode
     */
    _handleEditorFocus(oldVTree) {
        console.log(this._textarea.list.node);
        // this._textarea.apply(
        //     this._textarea.list.node,
        //     vNode,
        //     true
        // );
    }

    /**
     * Invoked on state change
     * @param {any} value 
     */
    _handleStateChange(value) {
        if (isDev()) {
            console.info("State change: %s", value);
        }
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