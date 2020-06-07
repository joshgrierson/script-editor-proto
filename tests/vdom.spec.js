import VNode from "../src/vdom/vnode";
import { createElement } from "../src/vdom/vdom";

describe("VDom", () => {
    describe("createElement", () => {
        it("should create dom element from vNode", () => {
            const vNode = new VNode({
                nodeName: "span",
                attrs: {
                    class: "test-class"
                }
            }).node;

            const domElement = createElement(vNode);

            expect(domElement.nodeName).toBe("SPAN");
            expect(domElement.classList[0]).toBeDefined();
        });

        it("should create dom element with children from vNode", () => {
            const vNode = new VNode({
                nodeName: "div"
            });

            vNode.addNode(new VNode({
                nodeName: "span",
                attrs: {
                    class: "child-node"
                }
            }));

            const domElement = createElement(vNode.node);

            expect(domElement.hasChildNodes()).toBe(true);
            expect(domElement.firstChild.classList[0]).toBeDefined();
        });
    });
});