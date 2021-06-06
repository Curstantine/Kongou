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

class Category {
  /**
   * @type {Category[]}
   */
  constructor(categoryObject) {
    if (!categoryObject) return;
    /**
     * Category category id of this object.
     * @type {Number}
     */
    this.id = categoryObject.id;
    /**
     * Name of this category.
     * @type {String}
     */
    this.name = categoryObject.name;
    /**
     * Site URL of this category.
     * @type {String}
     */
    this.url = categoryObject.url;
    /**
     * Number of results for this category.
     * @type {Number}
     */
    this.count = categoryObject.count;
  }

  static getCategory(categoryArray) {
    let cache = [];
    categoryArray.forEach((category) => {
      if (category.type === "category") {
        cache.push({
          id: parseInt(category.id),
          name: capitalize(category.name),
          url: "https://nhentai.net" + category.url,
          count: parseInt(category.count),
        });
      }
    });
    return cache;
  }
}
module.exports = Category;
