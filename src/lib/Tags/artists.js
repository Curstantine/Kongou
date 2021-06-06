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

class Artists {
  /**
   * Array of artists, if available.
   *
   * ```js
   * {
   * id:
   * }
   * ```
   * @type {Artists[]}
   */
  constructor(artistObject) {
    if (!artistObject) return;
    /**
     * nhentai artist id of this artist.
     * @type {Number}
     */
    this.id = artistObject.id;
    /**
     * Name of this artist.
     * @type {String}
     */
    this.name = artistObject.name;
    /**
     * Site URL of this artist.
     * @type {String}
     */
    this.url = artistObject.url;
    /**
     * Number of results for this artist.
     * @type {Number}
     */
    this.count = artistObject.count;
  }

  static getArtists(artistArray) {
    let cache = [];
    artistArray.forEach((artist) => {
      if (artist.type === "artist") {
        cache.push({
          id: parseInt(artist.id),
          name: capitalize(artist.name),
          url: "https://nhentai.net" + artist.url,
          count: parseInt(artist.count),
        });
      }
    });
    return cache;
  }
}
module.exports = Artists;
