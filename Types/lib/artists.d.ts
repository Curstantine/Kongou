export = Artists;
declare class Artists {
    static getArtists(artistArray: any): any[];
    /**
     * Array of artists, if available.
     *
     * ```js
     * {
     * }
     * ```
     * @type {Artists[]}
     */
    constructor(artistObject: any);
    /**
     * nhentai artist id of this artist.
     * @type {Number}
     */
    id: number;
    /**
     * Name of this artist.
     * @type {String}
     */
    name: string;
    /**
     * Site URL of this artist.
     * @type {String}
     */
    url: string;
    /**
     * Count of this artist.
     * @type {Number}
     */
    count: number;
}
