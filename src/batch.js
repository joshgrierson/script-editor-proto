import { genUuid } from "./utils";

const MAX_DELTA = 5;

export default class Batch {
    constructor() {
        this.jobs = {};
        this._current = null;
        this._start = null;
    }

    add(task) {
        if (!this._start) {
            this._start = Date.now();
        }

        const delta = (Date.now() - this._start);

        if (delta >= MAX_DELTA) {
            this._createJob(task);
        }
    }

    _createJob(task) {
        this.jobs[genUuid()] = new Promise((resolve, reject) => { 
        });
    }
}