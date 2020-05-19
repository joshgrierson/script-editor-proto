export default class ElementAbstract {
    constructor(namespace, observables) {
        this.namespace = namespace;
        this._observables = observables;
        this.registeredEvents = {};
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