import { createElement } from "./vdom";
import { log } from "../utils";
import { cloneDeep } from "lodash";

/**
 * This is not your typical vpatch, we know the structure of our virtual tree
 * we don't need to patch any children
 * @param {DOMElement} $parent 
 * @param {DiffTree} diffTree
 * @param {Map} createRefCond 
 */
export default function ($parent, diffTree, createRefCond) {
    let i = diffTree.length;

    const addNode = (diff) => {
        $parent.appendChild(
            createElement(
                diff.vNode,
                createRefCond
            )
        );
    };

    const removeNode = (diff) => {
        try {
            console.log(diff);
            $parent.removeChild(diff.vNode.ref);
        } catch (err) {
            log(err);
        }
    };

    const replaceNode = (diff) => {
        $parent.replaceChild(diff.vNode.ref, diff.oldVNode.ref);
    };

    while(i--) {
        if (diffTree[i].action == "add") {
            addNode(diffTree[i]);
        } else if (diffTree[i].action == "remove") {
            removeNode(diffTree[i]);
        } else if (diffTree[i].action == "replace") {
            replaceNode(diffTree[i]);
        }
    }
}

/**
 * Deep clones VTree
 * @param {VNode} vTree
 */
export function vTreeSnapshot(vTree) {
    return cloneDeep(vTree);
}