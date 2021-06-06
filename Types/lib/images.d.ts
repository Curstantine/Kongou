export = Images;
declare class Images {
    static getImages(ImageArray: any, id: any): {
        pages: any;
        thumbnails: any;
    };
    /**
     * @type {Images}
     */
    constructor(ImageObject: any);
    /**
     * Array of strings containing image URLs.
     *
     * ```js
     * [
     * 'https://i.nhentai.net/galleries/{media_id}/1.{media_type}',
     * 'https://i.nhentai.net/galleries/{media_id}/2.{media_type}',
     *'https://i.nhentai.net/galleries/{media_id}/3.{media_type}',
     * ]
     * ```
     * @type {String[]}
     */
    pages: string[];
    /**
     * Array of strings containing thumbnail URLs.
     *
     * ```js
     * [
     * 'https://t.nhentai.net/galleries/{media_id}/1t.{media_type}',
     * 'https://t.nhentai.net/galleries/{media_id}/2t.{media_type}',
     *'https://t.nhentai.net/galleries/{media_id}/3t.{media_type}',
     * ]
     * ```
     * @type {String[]}
     */
    thumbnails: string[];
}
