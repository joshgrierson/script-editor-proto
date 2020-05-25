export default function createElement(vNode, observables) {
    if (typeof vNode === "string") {
        return document.createElement(vNode);
    }

    const $el = document.createElement(vNode.nodeName);

    if (vNode.attrs) {
        for(const attr in vNode.attrs) {
            $el.setAttribute(attr, vNode.attrs[attr]);
        }
    }

    if (vNode.nativeEvents && vNode.nativeEvents.length > 0) {
        vNode.nativeEvents.forEach(function(event) {
            registerEventHandler($el, event, observables);
        });
    }

    vNode.children.forEach(function(vChildNode) {
        $el.appendChild(createElement(vChildNode, observables));
    });

    return $el;
}

export function registerEventHandler($node, nativeEvent, observables) {
    if ($node && observables) {
        $node.addEventListener(nativeEvent, function(ev) {
            observables.forEach(function(observer) {
                observer.forEach((fn) => fn.call(null, ev.currentTarget));
            });
        });
    }
}