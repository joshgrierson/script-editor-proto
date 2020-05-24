import TextBox from "./textbox";
import Topics from "./topics";
import createElement from "./vdom/vdom";
import diffTree from "./vdom/vtree";

export default class Editor {
    constructor(options) {
        this._options = {
            testOpt: "__test"
        };
        this._mountElement = document.createElement("div");
        this._eventTypes = {
            KEYDOWN: "onkeydown",
            KEYUP: "keyup"
        };
        this._registeredEvents = [];
        this._observables = {};

        const optKeys = Object.keys(this._options);

        if (options) {
            optKeys.forEach((key) => {
                if (options[key]) {
                    this._options[key] = options[key];
                }
            });
        }

        this._validateOptions();

        this._vTree = [];
        this._patches = [];
    }

    mount(element) {
        try {
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

            this._subscribe(Topics.onEditChange, this._handleEdit);
    
            document.addEventListener("DOMContentLoaded", () => this._run());
        } catch(err) {
            console.error(err);
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

        // register element event listeners
        // this._registerEventListeners();

        // flush nodes to dom
        this._flushNodes();
    }

    _initialTree() {
        this._vTree = [new TextBox({
            eventTypes: this._eventTypes
        }).getVNode()];

        this._vTree.forEach((vNode) => {
            this._patches.push(($node) => {
                $node.appendChild(createElement(vNode));
                return $node;
            });
        });
    }

    _flushNodes() {
        this._patches.forEach((patchFn) => {
            patchFn(this._mountElement);
        });
    }

    _subscribe(topic, fn) {
        if (!this._observables[topic]) {
            this._observables[topic] = [];
        }

        this._observables[topic].push(fn);
    }

    /**
     * Handles text edit
     */
    _handleEdit(data) {
        console.log("Event[Text Edit]", data);
    }

    _registerEventListeners() {
        this._textbox.registerEvents();
    }

    _validateOptions() {
        console.log(this._options);
    }
}