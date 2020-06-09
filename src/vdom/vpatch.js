import { createElement } from "./vdom";
import { deepClone } from "../utils";

/**
 * This is not your typical vpatch, we know the structure of our virtual tree
 * for example max number of levels of children in the tree
 * @param {DOMElement} $parent 
 * @param {VNode} newVTree 
 * @param {VNode} oldVTree 
 * @param {Map} opts 
 */
export default function ($parent, newVTree, oldVTree, opts) {
    const {
        createRefCond,
        eventMap
    } = opts;

    const addNode = () => {
        $parent.appendChild(createElement(
            newVTree,
            eventMap,
            createRefCond
        ));
    };

    if (!oldVTree) {
        return addNode();
    }
    
    if (newVTree.children.length > oldVTree.children.length) {
        addNode();
    }
}

export function vTreeSnapshot(vTree) {
    return deepClone(vTree);
}