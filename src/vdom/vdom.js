export default function createElement(vNode, observables) {
    if (typeof vNode === "string") {
        return document.createTextNode(vNode);
    }

    const $el = document.createElement(vNode.nodeName);

    if (vNode.attrs) {
        for(const attr in vNode.attrs) {
            $el.setAttribute(
                attr.startsWith("data") ? `data-${attr.replace("data", "")}` : attr,
                vNode.attrs[attr]
            );
        }

        $el.setAttribute("data-node-uid", vNode.id);
    }

    if (vNode.nativeEvents && vNode.topics && observables) {
        vNode.nativeEvents.forEach(function(event) {
            registerEventHandler($el, event, observables[
                    vNode.topics[event]
                ]
            );
        });
    }

    vNode.children.forEach(function(vChildNode) {
        $el.appendChild(createElement(vChildNode, observables));
    });

    return $el;
}

export function registerEventHandler($node, nativeEvent, observers) {
    if ($node && observers) {
        $node.addEventListener(nativeEvent, function(ev) {
            observers.forEach((fn) => fn.call(null, ev));
        });
    }
}