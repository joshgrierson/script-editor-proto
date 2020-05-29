export default class Observer {
    constructor() {
        this._observables = [];
    }

    subscribe(topic, fn) {
        if (!this._observables[topic]) {
            this._observables[topic] = [];
        }

        this._observables[topic].push(fn);

        return () => {
            const fnIdx = this._observables[topic].indexOf(fn);
            if (fnIdx > -1) {
                this._observables[topic].splice(fnIdx, 1);
            }
        };
    }

    notify(topic, data) {
        if (this._observables[topic]) {
            this._observables[topic].forEach(
                (fn) => fn.call(null, data)
            );
        }
    }

    getObservers(topic) {
        return this._observables[topic];
    }

    groupObservables(topics) {
        const groups = {};

        Object.values(topics).forEach((topic) => {
            if (this._observables[topic]) {
                groups[topic] = this._observables[topic];
            }
        });

        return groups;
    }
}