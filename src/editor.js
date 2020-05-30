import TextBox from "./textbox";
import Topics from "./topics";
import Observer from "./observer";
import createElement from "./vdom/vdom";
import diffTree from "./vdom/vtree";
import Container from "typedi";
import { deepClone } from "./utils";

export default class Editor {
    constructor(options) {
        this._TAG = "Script Editor v1";
        this._options = {
            testOpt: "__test"
        };

        Container.set("editor.observer", new Observer());

        this._observer = Container.get("editor.observer");
        this._validateOptions(options);

        this._mountElement = document.createElement("div");
        this._eventTopicMap = {
            "focus": Topics.onEditFocus,
            "click": Topics.onClickEdit,
            "keydown": Topics.onEditChange
        };

        this._vTree = {};
        this._vTreeSnapshot = {};
        this._patches = [];
        this._route = {};
        this._data = {
            route: {},
        };
        this._focusedElement;
    }

    mount(element) {
        try {
            document.addEventListener("DOMContentLoaded", () => {
                if (typeof element === "string") {
                    const targetElement = document.querySelector(element);
        
                    if (targetElement) {
                        this._mountElement = targetElement;
                    } else {
                        throw new Error(`Element [${element}] not found.`);
                    }
                } else if (element) {
                    this._mountElement = element;
                } else {
                    throw new Error(`Element [${element}] not found.`);
                }

                this._run();
            });
        } catch(err) {
            this._handleLogMessage({
                type: "error",
                msg: err
            });
        }
    }

    unmount() {
        if (this._mountElement) {
            // remove all nodes from mount container
        }
    }

    // executed after mount
    _run() {
        this._subscribeToTopics();
        this._defineRoute(0); // define getters and setters on route
        this._initialTree();

        // flush nodes to dom
        this._flushNodes();
    }

    _initialTree() {
        this._vTree = new TextBox({
            topics: this._eventTopicMap
        });

        this._patches.push(($node) => {
            $node.appendChild(
                createElement(
                    this._vTree.vNode(),
                    this._observer.groupObservables(
                        this._eventTopicMap
                    )
                )
            );
            return $node;
        });
    }

    _flushNodes() {
        this._patches.forEach((patchFn) => {
            patchFn(this._mountElement);

            /**
             * We have patched the dom,
             * we can now dispose of the patch from memory
             */
            this._patches.splice(
                this._patches.indexOf(patchFn, 1)
            );
        });
    }

    /**
     * Invoked on textbox focus
     * @param {Event} event
     */
    _handleEditFocus(event) {
        console.log("Patches empty", this._patches);

        const nodeKey = event.target.getAttribute("data-nodekey");

        if (!Object.keys(this._route).length) {
            this._route[0] = "Hello World";
        }
    }

    /**
     * Invoked on click textarea
     * @param {Event} event
     */
    _handleClickEdit(event) {}

    _handleEditChange(event) {
        if (event.key === "Backspace") {
        } else if (event.code.startsWith("Key")) {
        }
    }

    /**
     * Invoked on route key setter
     * @param {String} text 
     */
    _handleUpdateTree({ text, index }) {
        console.log("State Change: %s at key %d", text, index);
        const newTree = this._vTree;

        this._vTreeSnapshot = deepClone(this._vTree.vNode());

        newTree.addTextLine(text);

        const patchFn = diffTree(newTree.vNode(), this._vTreeSnapshot);
    }

    _defineRoute(index) {
        Object.defineProperty(this._route, index, {
            get() {
                return this._route[index];
            },
            set: (val) => {
                this._observer.notify(Topics.stateChange, {
                    text: val,
                    index
                });
            }
        });
    }

    _subscribeToTopics() {
        this._observer.subscribe(
            Topics.onEditFocus,
            this._handleEditFocus.bind(this)
        );

        this._observer.subscribe(
            Topics.onEditChange,
            this._handleEditChange.bind(this)
        );

        this._observer.subscribe(
            Topics.onClickEdit,
            this._handleClickEdit.bind(this)
        );

        this._observer.subscribe(
            Topics.stateChange,
            this._handleUpdateTree.bind(this)
        );
    }

    _handleLogMessage({ type, msg }) {
        console[type](`[${this._TAG}]`, msg);
    }

    _validateOptions(options) {
        const optKeys = Object.keys(this._options);

        this._observer.subscribe(Topics.onLogMessage, this._handleLogMessage.bind(this));

        if (options) {
            const invalidOption = [];

            optKeys.forEach((key) => {
                if (options[key]) {
                    this._options[key] = options[key];
                } else {
                    invalidOption.push(key);
                }
            });

            if (invalidOption[0]) {
                this._observer.notify(Topics.onLogMessage, {
                    type: "warn",
                    msg: `Invalid options: [${invalidOption.join()}]`
                });
            }
        }
    }
}