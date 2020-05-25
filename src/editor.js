import TextBox from "./textbox";
import Topics from "./topics";
import Observer from "./observer";
import createElement from "./vdom/vdom";
import diffTree from "./vdom/vtree";

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
        this._observer
            .subscribe(Topics.onEditFocus, this._handleEditFocus);

        this._initialTree();

        // register element event listeners
        // this._registerEventListeners();

        // flush nodes to dom
        this._flushNodes();
    }

    _initialTree() {
        this._vTree = [new TextBox({
            eventTopic: Topics.onEditFocus
        })];

        this._vTree.forEach((comp) => {
            this._patches.push(($node) => {
                $node.appendChild(
                    createElement(
                        comp.getVNode(),
                        this._observer.getObservers([comp.getTopic()])
                    )
                );
                return $node;
            });
        });
    }

    _flushNodes() {
        this._patches.forEach((patchFn) => {
            patchFn(this._mountElement);
        });
    }

    _handleEditFocus(data) {
        console.log(Topics.onEditFocus, data);
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