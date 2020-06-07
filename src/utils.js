export function genUuid() {
    let date = new Date().getTime();
    
    return "xxxxxx".replace(/[xy]/g, function(c) {
        const r = (date + Math.random() * 32) % 16 | 0;
        date = Math.floor(date / 16);
        return r.toString(32);
    });
}

export function findElement(query, $root) {
    let found;

    if (typeof query == "string") {
        if ($root) {
            found = $root.querySelector(query);
        } else {
            found = document.querySelector(query);
        }
    } else {
        found = query;
    }

    return found;
}

export function log(msg, tag, type) {
    type = type || "info";
    let msgString = msg;

    if (msg.stack) {
        type = "error";
        msgString = msg.stack;
    }

    if (tag) {
        msgString = `[${tag}]: ${msgString}`;
    }

    console[type](msgString);
}

export function hyphenate(text) {
    return text.trim().replace(/([A-Z])/g, "-$1").toLowerCase();
}

export function isDev() {
    return process.env.NODE_ENV !== "production";
}

export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}