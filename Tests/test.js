const Kongou = require("../src/index");
var assert = require("assert");
const stuff = {
  keyword: "Feticolle",
  id: "",
};
/*describe("query()", function () {
  it("Query with string", function () {
    let response = Kongou.query(stuff.keyword);
    assert.strictEqual(typeof response[0].id, "number");
  });
  it("Query with object", function () {
    let response = Kongou.query({ keyword: stuff.keyword, sort: "popular" });
    assert.strictEqual(typeof response[0].id, "number");
  });
});*/
Kongou.get(178513).then((data) => {
  console.log(data);
});
