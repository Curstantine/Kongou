import Book from './structures/book';
import { LanguageType, TagType } from './enums';

export interface ServerBook {
  id: number;
  media_id: string;
  title: Title;
  images: ImageTypes;
  scanlator: string | undefined;
  upload_date: number;
  tags: TagObject[];
  num_pages: number;
  num_favorites: number;
}

export interface ServerBookQuery {
  result: ServerBook[];
  num_pages: number;
  per_page: number;
}

export interface BookQuery {
  result: Map<Book['id'], Book>;
  num_pages: number;
  per_page: number;
}

export type UrlObject = {
  base: string;
  api: string;
  images: {
    full: string;
    thumb: string;
  };
};

export interface Title {
  english: string;
  japanese: string;
  pretty: string;
}

export interface ImageObject {
  t: 'j' | 'p' | 'g';
  w: number;
  h: number;
}

export interface ImageTypes {
  pages: ImageObject[];
  cover: ImageObject;
  thumbnail: ImageObject;
}

export interface TagObject {
  id: number;
  type: TagType;
  name: string | LanguageType;
  count: number;
  /**
   * Relative URL to the tag from the site.
   *
   * Use {@link Tag siteURL} to make your life easier.
   */
  url: string;
}
