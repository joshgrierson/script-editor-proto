import h from "hyperscript";

export default class TextBox {
    constructor() {
        this._componentName = "text-box";
        this._classMap = {
            root: `c-${this._componentName}`
        };
        this._idMap = {};
    }

    render() {
        return h(`.${this._classMap.root}`, {
            contenteditable: true
        });
    }
}