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

class Groups {
  /**
   * @type {Groups[]}
   */
  constructor(groupObject) {
    if (!groupObject) return;
    /**
     * nhentai group id of this group.
     * @type {Number}
     */
    this.id = groupObject.id;
    /**
     * Name of this group.
     * @type {String}
     */
    this.name = groupObject.name;
    /**
     * Site URL of this group.
     * @type {String}
     */
    this.url = groupObject.url;
    /**
     * Count of this group.
     * @type {Number}
     */
    this.count = groupObject.count;
  }

  static getGroups(groupArray) {
    let cache = [];
    groupArray.forEach((group) => {
      if (group.type === "group") {
        cache.push({
          id: parseInt(group.id),
          name: capitalize(group.name),
          url: "https://nhentai.net" + group.url,
          count: parseInt(group.count),
        });
      }
    });
    return cache;
  }
}
module.exports = Groups;
