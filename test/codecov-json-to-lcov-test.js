import assert from "power-assert";
import toLcov from "../src/codecov-json-to-lcov";
import fs from "fs";
const codecovJSON = require("./fixtures/codecov.json");
const lcovInfo = fs.readFileSync(__dirname + "/fixtures/lcov.info", "utf-8");
describe("codecov-json-to-lcov", function () {
    it("should convert string", ()=> {
        assert(typeof toLcov(codecovJSON) === "string");
    });
    it("should convert lcov format", () => {
        assert.equal(toLcov(codecovJSON), lcovInfo);
    });
});