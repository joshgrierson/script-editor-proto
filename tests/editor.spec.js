import Editor from "../src/editor";
import * as utils from "../src/utils";

describe("Script editor mounting", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it("should NOT throw error on mounting", () => {
        document.body.innerHTML = "<div id=\"script-editor\"></div>";

        const log = jest.spyOn(utils, "log");

        const editor = new Editor();
        editor.mount("#script-editor");

        expect(log).not.toHaveBeenCalled();
    });
});