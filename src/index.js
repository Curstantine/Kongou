const { APIRequest, APIQueryRequest } = require("./util");
const Images = require("./lib/images");

const Artists = require("./lib/artists");
const Category = require("./lib/category");
const Characters = require("./lib/characters");
const Groups = require("./lib/groups");
const Languages = require("./lib/languages");
const Parodies = require("./lib/parodies");
const Tags = require("./lib/tags");
const { KongouClientError } = require("./Errors/errClass");

class Kongou {
  constructor(response) {
    if (!response) return;
    /**
     * nhentai id of this object
     * @type {String}
     */
    this.id = response.id;
    /**
     * Media id of this object.
     * @type {Number}
     */
    this.media_id = response.media_id;
    /**
     * @typedef {Object} titleObject
     * @property {String} titleObject.english
     * @property {String} titleObject.native
     * @property {String} titleObject.native
     */
    this.title = {
      english: "",
      native: "",
      pretty: "",
    };
    /**
     * Array of artists, if available.
     * @type {Artists[]}
     */
    this.artist = Artists.getArtists(response.tags);
    /**
     * Array of categories, if available.
     * @type {Category[]}
     */
    this.category = Category.getCategory(response.tags);
    /**
     * Array of Characters, if available.
     * @type {Characters[]}
     */
    this.characters = Characters.getCharacters(response.tags);
    /**
     * Array of Groups, if available.
     * @type {Groups[]}
     */
    this.groups = Groups.getGroups(response.tags);
    /**
     * Array of languages, if available.
     * @type {Languages[]}
     */
    this.languages = Languages.getLanguages(response.tags);
    /**
     * Array of Parodies, if available.
     * @type {Parodies[]}
     */
    this.parodies = Parodies.getParodies(response.tags);
    /**
     * Array of tags of this object.
     * @type {Tags[]}
     */
    this.tags = Tags.getTags(response.tags);
    /**
     * Array of images of this object.
     * @type {Images}
     */
    this.images = Images.getImages(response.images, response.media_id);
    /**
     * Number of pages for this object.
     * @type {Number}
     */
    this.pages = response.pages;
    /**
     * Number of favorites for this object.
     * @type {Number}
     */
    this.num_favorites = response.num_favorites;
  }

  static cleanObject(response) {
    return {
      id: parseInt(response.id),
      media_id: parseInt(response.media_id),
      title: {
        english: response.title.english,
        native: response.title.japanese,
        pretty: response.title.pretty,
      },
      scanlator: response.scanlator ? response.scanlator : null,
      upload_date: {
        unix: response.upload_date,
        date: new Date(response.upload_date),
      },
      artist: Artists.getArtists(response.tags),
      category: Category.getCategory(response.tags),
      characters: Characters.getCharacters(response.tags),
      groups: Groups.getGroups(response.tags),
      languages: Languages.getLanguages(response.tags),
      parodies: Parodies.getParodies(response.tags),
      tags: Tags.getTags(response.tags),
      images: {
        pages: Images.getImages(response.images, response.media_id).pages,
        thumbnails: Images.getImages(response.images, response.media_id)
          .thumbnails,
      },
      num_pages: parseInt(response.num_pages),
      num_favorites: parseInt(response.num_favorites),
    };
  }
  /**
   * Returns an object of data specific to the supplied id.
   * https://nhentai.net/api/gallery/
   *
   * ## Example
   *
   * ```js
   * const Kongou = require("kongou");
   * Kongou
   *  .get(178513)
   *  .then((data) => console.log(data));
   * ```
   * @param {Number} id
   * @returns {Promise<Kongou>}
   */
  get(id) {
    return new Promise(async (resolve, reject) => {
      if (typeof id !== "number") {
        if (!isNaN(parseInt(id))) {
          reject(new KongouClientError("K003", "Given ID is not a Number."));
        }
      }
      APIRequest(`/api/gallery/${id}`).then((response) => {
        resolve(Kongou.cleanObject(response));
      });
    });
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
   * @returns {Promise<Kongou[]>}
   */
  query(searchParameters = {}) {
    return new Promise(async (resolve, reject) => {
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
      let cache = [];
      const response = await APIQueryRequest(
        "galleries/search",
        "GET",
        searchParameters
      );
      response.forEach((result) => {
        cache.push(Kongou.cleanObject(result));
      });
      resolve(cache);
    });
  }
}
module.exports = new Kongou();
