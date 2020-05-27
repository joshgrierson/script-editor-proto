import TextBox from "./textbox";
import Topics from "./topics";
import Observer from "./observer";
import createElement from "./vdom/vdom";
import diffTree, { isTextEmpty } from "./vdom/vtree";

export default class Editor {
    constructor(options) {
        this._TAG = "Script Editor v1";
        this._options = {
            testOpt: "__test"
        };

        this._observer = new Observer();
        this._validateOptions(options);

        this._mountElement = document.createElement("div");
        this._eventTypes = {
            KEYDOWN: "onkeydown",
            KEYUP: "keyup"
        };
        this._registeredEvents = [];

        this._vTree = {};
        this._patches = [];
        this._route = [];
        this._nodeIndex = 0;
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
        this._initialTree();
        this._subscribeToTopics();

        // flush nodes to dom
        this._flushNodes();
    }

    _initialTree() {
        this._vTree = new TextBox({
            topics: [
                Topics.onEditFocus,
                Topics.onEditChange
            ]
        }, this._nodeIndex, this._route).getVNode();

        this._patches.push(($node) => {
            $node.appendChild(
                createElement(
                    this._vTree,
                    this._observer.groupObservables(
                        this._vTree.topics
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

    _handleEditFocus(element) {
        console.log("Patches empty", this._patches);
        const newTree = [];

        if (this._route.length == 0) {
            console.log("Script is empty");
        }
    }

    /**
     * Handles text edit
     */
    _handleEdit(data) {
        console.log("Event[Text Edit]", data);
    }

    _subscribeToTopics() {
        this._observer.subscribe(
            Topics.onEditFocus,
            this._handleEditFocus.bind(this)
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