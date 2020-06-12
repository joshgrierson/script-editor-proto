import { findElement, log } from "./utils";
import TextArea from "./textarea";
import Observer from "./observer";
import defineReactive, { removeReactive } from "./observer/reactive";
import Batch from "./batch";

/**
 * Entry point for script-edtior component.
 */
export default class Editor {
    constructor(options) {
        this._root = null;

        this._data = {};
        this._cache = {};
        this._listeners = {};

        this._observer = new Observer();
        this._textarea = new TextArea(
            this._data,
            this._cache,
            this._observer,
            this._listeners
        );

        this._batch = new Batch();
    }

    mount(element) {
        try {
            this._root = this._invalidateMountElement(
                findElement(element)
            );

            this._setup();
        } catch (ex) {
            log(ex);
        }
    }

    unmount() {}

    _setup() {
        this._registerObservables();

        // create some nodes for textarea
        this._textarea.createVNodes();
        this._textarea.apply(this._root);

        this._initState();
    }

    _initState() {
        const lines = [0, 1, 2, 3, 4, 5, 6, 7];

        for(let i = 0; i < lines.length; i++) {
            defineReactive({
                data: this._data,
                key: lines[i],
                observer: this._observer,
                batch: this._batch
            });

            this._data[i] = "";
        }
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
    _handleEditorFocus(vNode, ev) {
        removeReactive({
            data: this._data,
            key: 0,
            observer: this._observer
        });
    }

    /**
     * Invoked on state change
     * @param {any} value 
     */
    _handleStateChange(value) {
        console.info("State change");

        if (typeof value == "string") {
            this._textarea.addTextLine(value);
        } else if (typeof value == "object" && value.deleted) {
            this._textarea.removeTextLine(0);
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