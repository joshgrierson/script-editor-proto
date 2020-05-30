export function genUuid() {
    let date = new Date().getTime();
    
    return "xxxxxx".replace(/[xy]/g, function(c) {
        const r = (date + Math.random() * 32) % 16 | 0;
        date = Math.floor(date / 16);
        return r.toString(32);
    });
}

export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}