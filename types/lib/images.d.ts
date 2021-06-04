export = Images;
declare class Images {
    static getImages(ImageArray: any, id: any): {
        pages: any[];
        thumbnails: any[];
    };
    /**
     * @type {Images[]}
     */
    constructor(ImageObject: any);
    /**
     * Array of base res images.
     * @type {Array}
     */
    pages: any[];
    /**
     * Array of image thumbnails
     * @type {Array}
     */
    thumbnails: any[];
}
