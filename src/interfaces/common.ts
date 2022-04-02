export type UrlObject = {
  base: string;
  api: string;
  images: {
    full: string;
    thumb: string;
  }
}

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

export enum TagType {
  Artist = 'artist',
  Category = 'category',
  Character = 'character',
  Group = 'group',
  Language = 'language',
  Parody = 'parody',
  Tag = 'tag',
}

export interface TagObject {
  id: number;
  'type': TagType;
  name: string;
  count: number;
  /**
   * Relative URL to the tag from the site. \
   * Use {@link TagObject siteURL} to make your life easier.
   */
  url: string;
}
