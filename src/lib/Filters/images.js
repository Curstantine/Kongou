const TYPE = {
  j: "jpg",
  p: "png",
  g: "gif",
};

class Images {
  /**
   * @type {Images[]}
   */
  constructor(imageObject, media_id) {
    this.pages = imageObject.pages.forEach((page, i) => {
      images.push(
        `https://i.nhentai.net/galleries/${media_id}/${[i + 1]}.${TYPE[page.t]}`
      );
    });
    this.thumbnails = imageObject.pages.forEach((page, i) => {
      images.push(
        `https://t.nhentai.net/galleries/${media_id}/${[i + 1]}.${TYPE[page.t]}`
      );
    });
  }
}
module.exports = { Images };
