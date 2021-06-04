const Kongou = require("../src/index");
var assert = require("assert");
const stuff = {
  keyword: "Feticolle",
  id: 178513,
};
describe("query()", function () {
  it("Query - String", function () {
    Kongou.query(stuff.keyword).then((response) => {
      assert.strictEqual(typeof response[0].id, "number");
    });
  });
  this.timeout(1000);
  it("Query - Object", function () {
    Kongou.query({ keyword: stuff.keyword, sort: "popular" }).then((data) => {
      assert.strictEqual(typeof response[0].id, "number");
    });
  });
  this.timeout(1000);
});

describe("get()", function () {
  it("get() - String", function () {
    Kongou.get(stuff.id.toString()).then((response) => {
      assert.strictEqual(typeof response.id, "number");
    });
  });
  this.timeout(1000);
  it("get() - Number", function () {
    Kongou.get(stuff.id).then((response) => {
      assert.strictEqual(typeof response.id, "number");
    });
  });
});
Kongou.quer;
