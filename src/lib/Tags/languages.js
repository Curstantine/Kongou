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

class Languages {
  /**
   * @type {Languages[]}
   */
  constructor(languageObject) {
    if (!languageObject) return;
    /**
     * nhentai language id of this language.
     * @type {Number}
     */
    this.id = languageObject.id;
    /**
     * Name of this language.
     * @type {String}
     */
    this.name = languageObject.name;
    /**
     * Site URL of this language.
     * @type {String}
     */
    this.url = languageObject.url;
    /**
     * Number of results for this language.
     * @type {Number}
     */
    this.count = languageObject.count;
  }

  static getLanguages(languageArray) {
    let cache = [];
    languageArray.forEach((language) => {
      if (language.type === "language") {
        cache.push({
          id: parseInt(language.id),
          name: capitalize(language.name),
          url: "https://nhentai.net" + language.url,
          count: parseInt(language.count),
        });
      }
    });
    return cache;
  }
}
module.exports = Languages;
