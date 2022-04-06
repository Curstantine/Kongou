import { ImageObject, ImageTypes, UrlObject, ServerBook } from '../types';

export default class Images implements ImageTypes {
  public static readonly extension = {
    j: 'jpg',
    p: 'png',
    g: 'gif',
  };

  public readonly urls: UrlObject['images'];
  public readonly media_id: ServerBook['media_id'];
  public readonly pages: ImageObject[];
  public readonly cover: ImageObject;
  public readonly thumbnail: ImageObject;

  constructor(urls: Images['urls'], media_id: ServerBook['media_id'], images: ImageTypes) {
    this.urls = urls;
    this.media_id = media_id;
    this.cover = images.cover;
    this.pages = images.pages;
    this.thumbnail = images.thumbnail;
  }

  public getCover(): string {
    return `${this.urls.full}/${this.media_id}/cover.${Images.extension[this.cover.t]}`;
  }

  public getThumbnails(): string[] {
    return new Array(this.pages.length).fill(0).map((_, i) =>
      `${this.urls.thumb}/${this.media_id}/${i + 1}t.${Images.extension[this.thumbnail.t]}`,
    );
  }

  public getPages(): string[] {
    return this.pages.map((page, i) =>
      `${this.urls.full}/${this.media_id}/${i + 1}.${Images.extension[page.t]}`,
    );
  }
}
