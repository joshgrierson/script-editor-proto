export default function createElement(vNode, observable) {
    if (typeof vNode === "string") {
        return document.createElement(vNode);
    }

    const $el = document.createElement(vNode.nodeName);

    if (vNode.attrs) {
        for(const attr in vNode.attrs) {
            $el.setAttribute(attr, vNode.attrs[attr]);
        }
    }

    if (vNode.eventType) {
        registerEventHandler($el, vNode.eventType, observable);
    }

    vNode.children.forEach(function(vChildNode) {
        $el.appendChild(createElement(vChildNode, observable));
    });

    return $el;
}

export function registerEventHandler($node, eventType, observable) {
    if ($node && observable) {
        $node.addEventListener(eventType, function(ev) {
            observable.forEach((fn) => fn.call(null, ev.currentTarget));
        });
    }
}