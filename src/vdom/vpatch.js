import { createElement } from "./vdom";
import { deepClone } from "../utils";

/**
 * This is not your typical vpatch, we know the structure of our virtual tree
 * for example max number of levels of children in the tree
 * @param {DOMElement} $parent 
 * @param {DiffTree} diffTree
 * @param {Map} createRefCond 
 */
export default function ($parent, diffTree, createRefCond) {
    let i = diffTree.length;

    while(i--) {
        if (diffTree[i].action == "add") {
            $parent.appendChild(
                createElement(
                    diffTree[i].vNode,
                    createRefCond
                )
            );
        }
    }
}

export function vTreeSnapshot(vTree) {
    return deepClone(vTree);
}