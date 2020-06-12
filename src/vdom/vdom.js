import { hyphenate, log } from "../utils";

/**
 * Creates a dom element and possible child nodes.
 * Will create dom element ref on vNode if vNode matches createRefCond
 * @param {VNode} vNode 
 * @param {Map[]} createRefCond 
 */
export function createElement(vNode, createRefCond) {
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
                createElement(child, createRefCond)
            );
        });
    }

    if (createRefCond) {
        if (createRefCond.find((refCond) => vNode[refCond.key] === refCond.value)) {
            vNode.ref = $el;
        }
    }

    return $el;
}

export function registerEvents({ $node, vNode, observer, listeners }) {
    if (!listeners[vNode.id] && vNode.nativeEvents) {
        vNode.nativeEvents.forEach(function(event) {
            $node.addEventListener(event, (ev) => observer.notify(`editor-${event}`, {
                vNode,
                ev
            }));
            
            if (!listeners[vNode.id]) {
                listeners[vNode.id] = [];
            }

            listeners[vNode.id].push(event);
        });
    } else {
        log(`Event(s) [${vNode.nativeEvents.join()}] on node ${vNode.nodeName} already registered`,
            LIB_TAG,
            "warn"
        );
    }
}