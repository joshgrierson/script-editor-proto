export default function defineReactive({ data, cache, key, observer }) {
    Object.defineProperty(data, key, {
        get() {
            return cache[key];
        },
        set(val) {
            if (cache[key] !== val) {
                observer.notify("state-change", val);
                cache[key] = val;
            }
        }
    });

    return cache;
}