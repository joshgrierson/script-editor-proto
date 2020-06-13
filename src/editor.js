import { findElement, log } from "./utils";
import TextArea from "./textarea";
import Observer from "./observer";
import defineReactive, { removeReactive } from "./observer/reactive";
import keyevent from "./keyevent";

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

        this._pastKeyTime = null;
        this._keyTimer = null;
        this._chars = "";
        this._maxKeyDelta = 250;
        this._keyTimerMs = 300;
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
        defineReactive({
            data: this._data,
            key: 0,
            observer: this._observer
        });

        this._data[0] = "";
    }

    _registerObservables() {
        this._observer.subscribe(
            "editor-focus",
            this._handleEditorFocus.bind(this)
        );

        this._observer.subscribe(
            "editor-keydown",
            this._handleEditorKeydown.bind(this)
        );

        this._observer.subscribe(
            "state-change",
            this._handleStateChange.bind(this)
        );
    }

    /**
     * Invoked on editor focus event
     * @param {VNode, Event} param0
     */
    _handleEditorFocus({ vNode, ev }) {
        
    }

    /**
     * Invoked on editor keydown event
     * @param {VNode, Event} param0 
     */
    _handleEditorKeydown({ vNode, ev }) {
        const keyE = keyevent(ev);

        if (!this._data[0] && keyE.key == "backspace") {
            ev.preventDefault();
        }

        if (keyE.key == "key") {
            this._chars += keyE.val;

            const reset = () => {
                this._keyTimer = null;
                this._pastKeyTime = null;
                this._chars = "";
            };

            if (!this._pastKeyTime) {
                this._pastKeyTime = Date.now();
            }

            const delta = (Date.now() - this._pastKeyTime);
            console.log("Delta %dms", delta);

            if (!this._keyTimer) {
                this._keyTimer = setTimeout(() => {
                    this._data[0] = this._chars;
                    // log("Data set based on timer func");
    
                    reset();
                }, this._keyTimerMs);
            }
        }
    }

    /**
     * Invoked on state change
     * @param {any} value
     */
    _handleStateChange(value) {
        console.info("State change");
        const keys = Object.keys(value);

        keys.forEach((key) => {
            const pick = value[key];

            if (this._data[pick.key]) {
                this._textarea.updateTextLine(pick.val);
            } else {
                this._textarea.addTextLine(pick.val);
            }
        });
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