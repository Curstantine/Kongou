const TYPE = {
  j: "jpg",
  p: "png",
  g: "gif",
};

class Images {
  /**
   * @type {Images}
   */
  constructor(ImageObject) {
    if (!ImageObject) return;
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
    this.pages = ImageObject.pages;
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
    this.thumbnails = ImageObject.thumbnails;
  }
  static getImages(ImageArray, id) {
    return {
      pages: ImageArray.pages.map(
        (image, i) =>
          `https://i.nhentai.net/galleries/${id}/${[i + 1]}.${TYPE[image.t]}`
      ),
      thumbnails: ImageArray.pages.map(
        (image, i) =>
          `https://t.nhentai.net/galleries/${id}/${[i + 1]}t.${TYPE[image.t]}`
      ),
    };
  }
}
module.exports = Images;
