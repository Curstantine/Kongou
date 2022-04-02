import Tag from '../utils/tag';
import Images from '../utils/images';
import { ImageTypes, TagObject, Title, UrlObject } from '../interfaces/common';
import { ServerBook } from '../interfaces/response';

export default class Book {
  public readonly id: number;
  public readonly media_id: string;
  public readonly title: Title;
  public readonly images: Images;
  public readonly scanlator: string | undefined;
  public readonly upload_date: number;
  public readonly tags: Tag[];
  public readonly num_pages: number;
  public readonly num_favorites: number;
  private readonly urls: UrlObject;

  constructor(urls: UrlObject, book: ServerBook) {
    this.urls = urls;

    this.id = book.id;
    this.media_id = book.media_id;
    this.title = book.title;
    this.scanlator = book.scanlator;
    this.upload_date = book.upload_date;
    this.num_pages = book.num_pages;
    this.num_favorites = book.num_favorites;

    this.tags = book.tags.map((tag) => new Tag(this.urls.base, tag));
    this.images = new Images(this.urls.images, this.media_id,  book.images);
  }

  public getSiteURL() {
    return `${this.urls.base}/g/${this.id}`;
  }
}
