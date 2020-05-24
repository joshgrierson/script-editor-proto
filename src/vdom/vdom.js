export default function createElement(vNode) {
    if (typeof vNode === "string") {
        return document.createElement(vNode);
    }

    const $el = document.createElement(vNode.nodeName);

    if (vNode.attrs) {
        for(const attr in vNode.attrs) {
            $el.setAttribute(attr, vNode.attrs[attr]);
        }
    }

    vNode.children.forEach(function(vChildNode) {
        $el.appendChild(createElement(vChildNode));
    });

    return $el;
}