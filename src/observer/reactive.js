const cache = {};

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
export default function defineReactive({ data, key, observer, batch }) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            return cache[key];
        },
        set(val) {
            batch.add({ key, val });
            observer.notify("state-change", val);
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