const { KongouClientError } = require("../errors.js");
function keyCheck(keyword) {
  if (keyword !== undefined) {
    if (keyword.length === 0) {
      throw new KongouClientError("Input Error", "No keywords provided");
    }
    if (typeof keyword !== "string") {
      throw new KongouClientError("Input Error", "Keyword should be a string");
    }
  }
}
module.exports = { keyCheck };