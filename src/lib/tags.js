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
     * Count of this tag.
     * @type {Number}
     */
    this.count = tagObject.count;
    /**
     * Category of this tag.
     * @type {String}
     */
    this.category = tagObject.category;
  }
}
module.exports = Tags;
