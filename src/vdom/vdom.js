import { hyphenate } from "../utils";

export function createElement(vNode) {
    if (typeof vNode == "string") {
        return document.createTextNode(vNode);
    }

    const $el = document.createElement(vNode.nodeName);

    if (vNode.attrs) {
        const attrKeys = Object.keys(vNode.attrs);

        attrKeys.forEach(function(key) {
            if (key.startsWith("data-")) {
                key = hyphenate(key);
            }

            $el.setAttribute(key, vNode.attrs[key]);
        });
    }

    if (vNode.children.length) {
        vNode.children.forEach(function(child) {
            $el.appendChild(
                createElement(child)
            );
        });
    }

    return $el;
}