export default class Editor {
    constructor() {
        this.mountElement = null;
        console.info("Script Editor v1.0");
    }

    mount(element) {
        try {
            if (typeof element === "string") {
                const targetElement = document.querySelector(element);
    
                if (targetElement) {
                    this.mountElement = targetElement;
                } else {
                    throw new Error(`Element [${element}] not found.`);
                }
            }
    
            document.addEventListener("DOMContentLoaded", () => {
                this._run();
            });
        } catch(err) {
            console.error(err);
        }
    }

    // executed after mount
    _run() {}

    unmount() {
        if (this.mountElement) {
            // remove all nodes from mount container
        }
    }
}