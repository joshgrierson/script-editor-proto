import { log } from "./utils";

export default function (event) {
    let keyMap = {
        key: null,
        val: null
    };
    const keyCodes = ["Key", "Backspace"];

    keyCodes.forEach((code) => {
        if (event.code.startsWith(code)) {
            keyMap = {
                key: code.toLowerCase(),
                val: event.key
            };
        }
    });

    return keyMap;
}