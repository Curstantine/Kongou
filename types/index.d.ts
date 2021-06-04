declare const _exports: Kongou;
export = _exports;
declare class Kongou {
    constructor(response: any);
    /**
     * nhentai id of this object
     * @type {String}
     */
    id: string;
    /**
     * @typedef {Object} titleObject
     * @property {String} titleObject.english
     * @property {String} titleObject.native
     * @property {String} titleObject.native
     */
    title: {
        english: any;
        native: any;
        pretty: any;
    };
    /**
     * Media id of this object.
     * @type {Number}
     */
    media_id: number;
    /**
     * Array of tags of this object.
     * @type {Tags[]}
     */
    tags: Tags[];
    /**
     * Array of images of this object.
     * @type {Images[]}
     */
    images: Images[];
    /**
     * @private
     * @typedef {Object} QueryParamObject
     * @property {String} QueryParamObject.keyword
     * @property {Number} QueryParamObject.sort
     * @property {Number} QueryParamObject.page
     */
    /**
     * Peforms a search and returns an array of books.
     * https://nhentai.net/api/galleries/search?query=
     * @param {QueryParamObject} [searchParameters] An object of search parameters, or a string representing the title
     * @returns {Promise<Kongou>}
     */
    query(searchParameters?: {
        keyword: string;
        sort: number;
        page: number;
    }): Promise<Kongou>;
}
import Tags = require("./lib/tags");
import Images = require("./lib/images");
