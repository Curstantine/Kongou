const { APIRequest } = require("../util");
const Images = require("./Filters/images");
const Tags = require("./Filters/tags");
class Book {
  constructor(response) {
    if (!response) return;

    /**
     * nhentai id of this object
     * @type {Number}
     */
    this.id = response.id;

    /**
     * nhentai media id of this object
     * @type {Number}
     */
    this.media_id = response.media_id;

    /**
     * Titles of this object.
     * @type {Object}
     */
    this.titles = response.title;

    /**
     * Tags of this object.
     * @type {Object}
     */
    this.tags = new Tags(response.tags);

    /**
     * Images of this object.
     * @type {Object}
     */
    this.images = new Images(response.images, response.media_id);
  }
  static query(searchparams = {}) {
    if (typeof searchparams === String)
      searchparams = { keyword: searchparams, page: 1, sort: "popular-today" };
    return APIRequest("galleries/search");
  }
}
