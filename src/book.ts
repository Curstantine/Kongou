import { Images } from './images';
import { TitleObject, TagObject, ImageCategoryObject } from './Interfaces/responses/common';
import { ServerBook } from './Interfaces/responses/response';
import { Tag } from './tag';

export class Book {
  id: number;
  media_id: string;
  title: TitleObject;
  images: ImageCategoryObject;
  scanlator: string | undefined;
  upload_date: number;
  tags: TagObject[];
  num_pages: number;
  num_favorites: number;

  constructor(book: ServerBook) {
    this.id = book.id;
    this.media_id = book.media_id;
    this.title = book.title;
    this.images = book.images;
    this.scanlator = book.scanlator;
    this.upload_date = book.upload_date;
    this.tags = book.tags;
    this.num_pages = book.num_pages;
    this.num_favorites = book.num_favorites;
  }

  public getSiteURL() {
    return `https://nhentai.net/g/${this.id}`;
  }

  public getImages() {
    return new Images(this.media_id, this.images);
  }

  public getTags() {
    return this.tags.map((tag) => new Tag(tag));
  }
}
