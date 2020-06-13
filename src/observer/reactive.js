const cache = {};

// out scope vars for handling batch of updates
let promise = null;
let datavalues = {};

/**
 * Send data through in a batch.
 * Data is collected into a batch synchronously and executed on event-loop
 * @param {any} data 
 * @param {Observer} observer 
 */
function batch(data, observer) {
    datavalues[data.key] = {
        key: data.key,
        val: data.val
    };

    if (!promise) {
        promise = new Promise((resolve) => resolve(datavalues));
        promise.then((values) => {
            observer.notify("state-change", values);

            // reset our vars back to null and empty values
            datavalues = {};
            promise = null;
        });
    }
};

/**
 * Define reactive property on data map,
 * when setter is triggered this will notify any subscribers on the observer dep.
 * Deleting property using delete data[key] will not trigger setter,
 * so no subscriber on observer will be notified of this.
 * Use removeReactive to handle notifying on deletion.
 * @param {Map} data
 * @param {string|number} key
 * @param {Observer} observer
 */
export default function defineReactive({ data, key, observer }) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            return cache[key];
        },
        set(val) {
            batch({ key, val }, observer);
            cache[key] = val;
        }
    });

    return cache;
}

/**
 * Removes reactivity on item in data map,
 * and notify's subscribers on observer a deletion has taken place.
 * @param {object} param0 
 */
export function removeReactive({ data, key, observer }) {
    if (data && data[key] !== undefined) {
        delete data[key];

        observer.notify("state-change", {
            deleted: true,
            cache
        });

        if (cache && cache[key]) {
            delete cache[key];
        }
    }
}