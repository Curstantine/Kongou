declare const _exports: Kongou;
export = _exports;
declare class Kongou {
    static cleanObject(response: any): {
        id: number;
        media_id: number;
        title: {
            english: any;
            native: any;
            pretty: any;
        };
        scanlator: any;
        upload_date: {
            unix: any;
            date: Date;
        };
        artist: any[];
        category: any[];
        characters: any[];
        groups: any[];
        languages: any[];
        parodies: any[];
        tags: any[];
        images: {
            pages: any[];
            thumbnails: any[];
        };
        num_pages: number;
        num_favorites: number;
    };
    constructor(response: any);
    /**
     * nhentai id of this object
     * @type {String}
     */
    id: string;
    /**
     * Media id of this object.
     * @type {Number}
     */
    media_id: number;
    /**
     * @typedef {Object} titleObject
     * @property {String} titleObject.english
     * @property {String} titleObject.native
     * @property {String} titleObject.native
     */
    title: {
        english: string;
        native: string;
        pretty: string;
    };
    /**
     * Array of artists, if available.
     * @type {Artists[]}
     */
    artist: Artists[];
    /**
     * Array of categories, if available.
     * @type {Category[]}
     */
    category: Category[];
    /**
     * Array of Characters, if available.
     * @type {Characters[]}
     */
    characters: Characters[];
    /**
     * Array of Groups, if available.
     * @type {Groups[]}
     */
    groups: Groups[];
    /**
     * Array of languages, if available.
     * @type {Languages[]}
     */
    languages: Languages[];
    /**
     * Array of Parodies, if available.
     * @type {Parodies[]}
     */
    parodies: Parodies[];
    /**
     * Array of tags of this object.
     * @type {Tags[]}
     */
    tags: Tags[];
    /**
     * Array of images of this object.
     * @type {Images}
     */
    images: Images;
    /**
     * Number of pages for this object.
     * @type {Number}
     */
    pages: number;
    /**
     * Number of favorites for this object.
     * @type {Number}
     */
    num_favorites: number;
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
    get(id: number): Promise<Kongou>;
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
    query(searchParameters?: {
        keyword: string;
        sort: 'popular-today' | 'popular-week' | 'popular';
        page: number;
    }): Promise<Kongou[]>;
}
import Artists = require("./lib/artists");
import Category = require("./lib/category");
import Characters = require("./lib/characters");
import Groups = require("./lib/groups");
import Languages = require("./lib/languages");
import Parodies = require("./lib/parodies");
import Tags = require("./lib/tags");
import Images = require("./lib/images");
