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

class Parodies {
  /**
   * @type {Parodies[]}
   */
  constructor(parodyObject) {
    if (!parodyObject) return;
    /**
     * nhentai parody id of this parody.
     * @type {Number}
     */
    this.id = parodyObject.id;
    /**
     * Name of this parody.
     * @type {String}
     */
    this.name = parodyObject.name;
    /**
     * Site URL of this parody.
     * @type {String}
     */
    this.url = parodyObject.url;
    /**
     * Count of this parody.
     * @type {Number}
     */
    this.count = parodyObject.count;
  }

  static getParodies(parodyArray) {
    let cache = [];
    parodyArray.forEach((parody) => {
      if (parody.type === "parody") {
        cache.push({
          id: parseInt(parody.id),
          name: capitalize(parody.name),
          url: "https://nhentai.net" + parody.url,
          count: parseInt(parody.count),
        });
      }
    });
    return cache;
  }
}
module.exports = Parodies;
