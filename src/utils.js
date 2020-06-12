export const LIB_TAG = "Script Editor v1";

/**
 * Generates global uid
 */
export function genUuid() {
    let date = new Date().getTime();
    
    return "xxxxxx".replace(/[xy]/g, function(c) {
        const r = (date + Math.random() * 32) % 16 | 0;
        date = Math.floor(date / 16);
        return r.toString(32);
    });
}

/**
 * Finds dom element in root tree
 * @param {string|HTMLElement} query 
 * @param {HTMLElement} $root 
 */
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

/**
 * Wrapper on console log methods
 * @param {string} msg 
 * @param {string} type 
 */
export function log(msg, type) {
    if (!isDev() && type != "error") {
        return;
    }

    type = type || "info";
    let msgString = msg;

    if (msg.stack) {
        type = "error";
        msgString = msg.stack;
    }

    msgString = `[${LIB_TAG}]: ${msgString}`;

    console[type](msgString);
}

/**
 * Places hyphen's in string
 * @param {string} text 
 */
export function hyphenate(text) {
    return text.trim().replace(/([A-Z])/g, "-$1").toLowerCase();
}

/**
 * Checks env running in
 */
export function isDev() {
    return process.env.NODE_ENV !== "production";
}