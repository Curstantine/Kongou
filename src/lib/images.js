const TYPE = {
  j: "jpg",
  p: "png",
  g: "gif",
};

class Images {
  /**
   * @type {Images[]}
   */
  constructor(ImageObject) {
    if (!ImageObject) return;
    /**
     * Array of base res images.
     * @type {Array}
     */
    this.pages = ImageObject.pages;
    /**
     * Array of image thumbnails
     * @type {Array}
     */
    this.thumbnails = ImageObject.thumbnails;
  }
  static getImages(ImageArray, id) {
    let pages = [];
    let thumbnails = [];
    ImageArray.pages.forEach((page, i) => {
      pages.push(
        `https://i.nhentai.net/galleries/${id}/${[i + 1]}.${TYPE[page.t]}`
      );
      thumbnails.push(
        `https://t.nhentai.net/galleries/${id}/${[i + 1]}.${TYPE[page.t]}`
      );
    });
    return {
      pages: pages,
      thumbnails: thumbnails,
    };
  }
}
module.exports = Images;
