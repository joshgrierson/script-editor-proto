export default class ElementAbstract {
    constructor(namespace) {
        this.namespace = namespace;
        this.registeredEvents = {};
    }

    registerEvent(element, event, fn) {
        const nodeKey = element.getAttribute("nodekey");
        const regKey = nodeKey ? `_${this.namespace}-${nodeKey}-${event}` : null;

        if (regKey && element) {
            element[event] = (ev) => fn(ev);
            element.onkeyup = function(ev) {
                console.log(ev);
            };
            this.registeredEvents[regKey] = element;
        }
    }
}