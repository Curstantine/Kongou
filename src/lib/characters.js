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

class Characters {
  /**
   * @type {Characters[]}
   */
  constructor(characterObject) {
    if (!characterObject) return;
    /**
     * nhentai character id of this character.
     * @type {Number}
     */
    this.id = characterObject.id;
    /**
     * Name of this character.
     * @type {String}
     */
    this.name = characterObject.name;
    /**
     * Site URL of this character.
     * @type {String}
     */
    this.url = characterObject.url;
    /**
     * Count of this character.
     * @type {Number}
     */
    this.count = characterObject.count;
  }

  static getCharacters(characterArray) {
    let cache = [];
    characterArray.forEach((character) => {
      if (character.type === "character") {
        cache.push({
          id: parseInt(character.id),
          name: capitalize(character.name),
          url: "https://nhentai.net" + character.url,
          count: parseInt(character.count),
        });
      }
    });
    return cache;
  }
}
module.exports = Characters;
