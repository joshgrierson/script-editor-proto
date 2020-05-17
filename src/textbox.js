import h from "hyperscript";
import "./styles/_textbox.scss";

export default class TextBox {
    constructor(props) {
        this._props = props;
        this._componentName = "textbox";
        this._classMap = {
            root: `c-${this._componentName}`
        };
        this._idMap = {};
    }

    render() {
        const root = this._root();
        return root;
    }

    _root() {
        return h(`.${this._classMap.root}`, {
            attrs: {contenteditable: true}
        });
    }
}