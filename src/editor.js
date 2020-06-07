import { findElement, log } from "./utils";

export default class Editor {
    constructor(options) {
        this._root = null;
        this._tag = "Script Editor v1";
    }

    mount(element) {
        try {
            let el = findElement(element);

            if (el) {
                this._root = el;

                
            } else {
                throw new Error("Mount element not found");
            }
        } catch (ex) {
            log(ex, this._tag);
        }
    }

    unmount() {}
}