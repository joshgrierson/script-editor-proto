import { hyphenate } from "../utils";

export function createElement(vNode, eventMap) {
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

    if (vNode.nativeEvents && eventMap) {
        registerEvents($el, vNode, eventMap);
    }

    return $el;
}

function registerEvents($el, vNode, eventMap) {
    vNode.nativeEvents.forEach(function(event) {
        if (eventMap[event]) {
            $el.addEventListener(event, (ev) => eventMap[event](vNode, ev));
        }
    });
}