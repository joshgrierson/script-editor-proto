import { VNode } from "./VNode";
import h from "hyperscript";

export default class ElementAbstract {
    constructor(namespace, observables) {
        this.namespace = namespace;
        this._observables = observables;
        this.registeredEvents = {};
    }

    createVNode(vNode) {
        const {
            nodeName,
            attrs,
            text,
            childNode
        } = vNode;

        return VNode(nodeName, attrs, text, childNode);
    }

    createElement(element) {
        const {
            type,
            attrs,
            text,
            children
        } = element;

        return text ? h(type, attrs, text, ...children) : h(type, attrs, ...children);
    }

    registerEvent(element, event, fn) {
        const nodeKey = element.getAttribute("nodekey");
        const regKey = nodeKey ? `_${this.namespace}-${nodeKey}-${event}` : null;

        if (regKey && element && !this.registeredEvents[regKey]) {
            element.addEventListener(event, (ev) => fn.call(null, ev));
            this.registeredEvents[regKey] = element;
        }
    }

    notifySubscribers(topic, data) {
        // if topic exists in observable map, notify subscribers
        if (this._observables[topic]) {
            this._observables[topic].forEach(function(observer) {
                observer.call(null, data);
            });
        }
    }
}