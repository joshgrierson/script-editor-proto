import TextBox from "./textbox";

export default class Editor {
    constructor(options) {
        this._options = {
            testOpt: "__test"
        };
        this._mountElement = document.createElement("div");
        this._nodeList = [];
        this._eventTypes = {
            KEYDOWN: "onkeydown",
            KEYUP: "onkeyup"
        };
        this._registeredEvents = [];

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
        });
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
        // init elements
        this._textbox.init();

        // register element event listeners
        this._registerEventListeners();

        // push elements to node list for rendering
        this._nodeList.push(this._textbox.render());

        // flush nodes to dom
        this._flushNodes();
    }

    _flushNodes() {
        if (this._nodeList.length > 0) {
            let html = "";

            this._nodeList.forEach(node => {
                html += node.outerHTML;    
            });

            this._mountElement.innerHTML = html;
        } else {
            console.warn("No new nodes to render");
        }
    }

    _registerEventListeners() {
        this._textbox.registerEvents();
    }

    _validateOptions() {
        console.log(this._options);
    }
}