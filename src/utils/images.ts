import { ImageCategoryObject, ImageObject } from '../interfaces/common';
import { ServerBook } from '../interfaces/response';

const fullURL = 'https://i.nhentai.net/galleries';
const thumbURL = 'https://t.nhentai.net/galleries';
const ext = {
  j: 'jpg',
  p: 'png',
  g: 'gif',
};

export default class Images {
  private media_id: ServerBook['media_id'];
  private pages: ImageObject[];
  private cover: ImageObject;
  private thumbnail: ImageObject;

  constructor(media_id: ServerBook['media_id'], images: ImageCategoryObject) {
    this.media_id = media_id;
    this.cover = images.cover;
    this.pages = images.pages;
    this.thumbnail = images.thumbnail;
  }

  public getCover() {
    return `${fullURL}/${this.media_id}/cover.${ext[this.cover.t]}`;
  }

  public getThumbnails() {
    const thumbnails = new Array<string>(this.pages.length);
    thumbnails.flatMap((_, i) => `${thumbURL}/${this.media_id}/${i + 1}t.${ext[this.thumbnail.t]}`);
    return thumbnails;
  }

  public getPages() {
    return this.pages.map((page, i) => `${fullURL}/${this.media_id}/${i + 1}.${ext[page.t]}`);
  }
}
