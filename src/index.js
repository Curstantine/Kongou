const { APIRequest, APIQueryRequest } = require("./util");
const Images = require("./lib/images");
const Tags = require("./lib/tags");

class Kongou {
  constructor(response) {
    if (!response) return;
    /**
     * nhentai id of this object
     * @type {String}
     */
    this.id = response.id;
    /**
     * @typedef {Object} titleObject
     * @property {String} titleObject.english
     * @property {String} titleObject.native
     * @property {String} titleObject.native
     */
    this.title = {
      english: response.title.english,
      native: response.title.japanese,
      pretty: response.title.pretty,
    };
    /**
     * Media id of this object.
     * @type {Number}
     */
    this.media_id = response.media_id;
    /**
     * Array of tags of this object.
     * @type {Tags[]}
     */
    this.tags = new Tags(response.tags);
    /**
     * Array of images of this object.
     * @type {Images[]}
     */
    this.images = new Images(response.images, response.media_id);
  }

  /**
   * @private
   * @typedef {Object} QueryParamObject
   * @property {String} QueryParamObject.keyword
   * @property {'popular-today' | 'popular-week' | 'popular'} QueryParamObject.sort
   * @property {Number} QueryParamObject.page
   */
  /**
   * Peforms a search and returns an array of books.
   * https://nhentai.net/api/galleries/search?query=
   *
   * ## Example
   *
   * ```js
   * const Kongou = require("kongou")
   * Kongou
   * .query({ keyword: "Feticolle", sort: "popular", page: 1 })
   * .then((data) => console.log(data));
   * ```
   * @param {QueryParamObject} [searchParameters] An object of search parameters, or a string representing the title
   * @returns {Promise<Kongou>}
   */
  query(searchParameters = {}) {
    return new Promise((resolve, reject) => {
      if (typeof searchParameters === "string") {
        searchParameters = {
          keyword: searchParameters,
          sort: "popular-today",
          page: 1,
        };
      } else {
        searchParameters = {
          keyword: searchParameters.keyword,
          sort: searchParameters.sort ? searchParameters.sort : "popular-today",
          page: searchParameters.page ? searchParameters.page : 1,
        };
      }
      console.log(searchParameters);
      APIQueryRequest("galleries/search", "GET", searchParameters).then(
        (response) => {
          response.forEach((result) => {
            console.log(result.id);
          });
        }
      );
    });
  }
}
module.exports = new Kongou();
