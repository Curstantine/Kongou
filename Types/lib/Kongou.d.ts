export = Kongou;
declare class Kongou {
    static "__#1@#cleanObject"(response: any): {
        id: number;
        media_id: number;
        title: {
            english: any;
            native: any;
            pretty: any;
        };
        siteURL: string;
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
            pages: any;
            thumbnails: any;
        };
        num_pages: number;
        num_favorites: number;
    };
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
    static get(id: number): Promise<Kongou>;
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
    static query(searchParameters?: {
        keyword: string;
        sort: 'popular-today' | 'popular-week' | 'popular';
        page: number;
    }): Promise<Kongou[]>;
    constructor(response: any);
    /**
     * nhentai id of this object
     * @type {Number}
     */
    id: number;
    /**
     * Media id of this object.
     * @type {Number}
     */
    media_id: number;
    /**
     * @private
     * @typedef {Object} titleObject
     * @property {String} titleObject.english
     * @property {String} titleObject.native
     * @property {String} titleObject.pretty
     */
    /**
     * Title of this object.
     * @type {titleObject}
     */
    title: {
        english: string;
        native: string;
        pretty: string;
    };
    /**
     * Site url of this object.
     * @type {String}
     */
    siteURL: string;
    /**
     * Scanlator of this object, not implemented by the nhentai API.
     * @type {String || Null}
     */
    scanlator: string;
    /**
     * @private
     * @typedef {Object} dateObject
     * @property {Number} dateObject.unix
     * @property {Date} dateObject.date
     */
    /**
     * Upload date of this object.
     * @type {dateObject}
     */
    upload_date: {
        unix: number;
        date: Date;
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
     * Array of characters, if available.
     * @type {Characters[]}
     */
    characters: Characters[];
    /**
     * Array of groups, if available.
     * @type {Groups[]}
     */
    groups: Groups[];
    /**
     * Array of languages, if available.
     * @type {Languages[]}
     */
    languages: Languages[];
    /**
     * Array of parodies, if available.
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
     * @property {Array} pages
     * @property {Array} thumbnails
     */
    images: Images;
    /**
     * Number of pages of this object.
     * @type {Number}
     */
    num_pages: number;
    /**
     * Number of favorites for this object.
     * @type {Number}
     */
    num_favorites: number;
}
import Artists = require("./Tags/artists");
import Category = require("./Tags/category");
import Characters = require("./Tags/characters");
import Groups = require("./Tags/groups");
import Languages = require("./Tags/languages");
import Parodies = require("./Tags/parodies");
import Tags = require("./Tags/tags");
import Images = require("./images");
