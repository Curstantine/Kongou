class Tags {
  /**
   * @type {Tags[]}
   */

  constructor(tagObject) {
    if (!tagObject) {
      return;
    }
    tagObject.forEach((tag) => {
      if (tag.type === "language") {
        this.language = {
          id: parseInt(tag.id),
          name: capitalize(tag.name),
          url: tagify(tag.url),
          count: parseInt(tag.count),
        };
      }
      if (tag.type === "category")
        this.category = {
          id: parseInt(tag.id),
          name: capitalize(tag.name),
          url: tagify(tag.url),
          count: parseInt(tag.count),
        };
      if (tag.type === "tag")
        this.tag = {
          id: parseInt(tag.id),
          name: capitalize(tag.name),
          url: tagify(tag.url),
          count: parseInt(tag.count),
        };
    });
  }
}
module.exports = { Tags };
