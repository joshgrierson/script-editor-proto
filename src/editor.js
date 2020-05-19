import TextBox from "./textbox";
import Topics from "./topics";

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

        this._nodeList = {}; // node map
        this._nodeChanges = {}; // map of node uuids to timestamp
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

        this._textbox = new TextBox({
            eventTypes: this._eventTypes
        }, this._observables);
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
        // init elements
        this._textbox.init();

        // register element event listeners
        this._registerEventListeners();

        // push elements to node list for rendering
        this._nodeList[this._textbox.UUID] = this._textbox.render();
        this._nodeChanges[this._textbox.UUID] = Date.now();

        // flush nodes to dom
        this._flushNodes();
    }

    _flushNodes() {
        const nodeListKeys = Object.keys(this._nodeList);

        if (nodeListKeys.length > 0) {
            this._mountElement.append(...nodeListKeys.map(
                (key) => this._nodeList[key]
            ));
        } else {
            console.warn("No new nodes to render");
        }
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