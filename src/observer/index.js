export default class Observer {
    constructor() {
        this._observers = {};
    }

    subscribe(event, fn) {
        if (!this._observers[event]) {
            this._observers[event] = [];
        }

        this._observers[event].push(fn);

        return () => {
            const fnIdx = this._observers[event].indexOf(fn);

            if (fnIdx > -1) {
                this._observers[event].splice(fnIdx, 1);
            }
        };
    }

    notify(event, data) {
        if (this._observers[event]) {
            this._observers[event].forEach(
                (fn) => fn.call(null, data)
            );
        }
    }
}