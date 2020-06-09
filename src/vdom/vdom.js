import { hyphenate } from "../utils";

/**
 * Creates a dom element and possible child nodes.
 * Will create dom element ref on vNode if vNode matches createRefCond
 * @param {VNode} vNode 
 * @param {Map} eventMap 
 * @param {Map} createRefCond 
 */
export function createElement(vNode, eventMap, createRefCond) {
    if (typeof vNode == "string") {
        return document.createTextNode(vNode);
    }

    const $el = document.createElement(vNode.nodeName);

    $el.setAttribute("v-id", vNode.id);

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
                createElement(child, eventMap, createRefCond)
            );
        });
    }

    if (vNode.nativeEvents && eventMap) {
        registerEvents($el, vNode, eventMap);
    }

    if (createRefCond && vNode[createRefCond.key] === createRefCond.value) {
        vNode.ref = $el;
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