import Editor from "../src/editor";
import * as utils from "../src/utils";

jest.mock("../src/utils");

describe("Script editor mounting", () => {
    it("should assign root element from selector string", () => {
        const editor = new Editor();
        editor.mount("#script-editor");

        expect(utils.findElement).toHaveBeenCalledTimes(1);
    });
});