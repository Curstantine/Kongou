function capitalize(str) {
  str;
  const string = str
    .toString()
    .split("_")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    );
  return string[0];
}

class Tags {
  /**
   * @type {Tags[]}
   */
  constructor(tagObject) {
    if (!tagObject) return;
    /**
     * nhentai tag id of this tag.
     * @type {Number}
     */
    this.id = tagObject.id;
    /**
     * Name of this tag.
     * @type {String}
     */
    this.name = tagObject.name;
    /**
     * Site URL of this tag.
     * @type {String}
     */
    this.url = tagObject.url;
    /**
     * Number of results for this tag.
     * @type {Number}
     */
    this.count = tagObject.count;
  }

  static getTags(tagArray) {
    let cache = [];
    tagArray.forEach((tag) => {
      if (tag.type === "tag") {
        cache.push({
          id: parseInt(tag.id),
          name: capitalize(tag.name),
          url: "https://nhentai.net" + tag.url,
          count: parseInt(tag.count),
          category: capitalize(tag.type),
        });
      }
    });
    return cache;
  }
}
module.exports = Tags;
