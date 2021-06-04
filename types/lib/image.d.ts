export = Image;
declare class Image {
    constructor(ImageObject: any, media_id: any);
    /**
     * @private
     * @typedef {Object} ImageObject
     * @property {Array} ImageObject.pages
     * @property {Array} ImageObject.thumbnails
     */
    private pages;
    thumbnails: any;
}
