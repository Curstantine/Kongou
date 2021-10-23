export interface TitleObject {
  english: string;
  japanese: string;
  pretty: string;
}

export interface ImageObject {
  t: 'j' | 'p' | 'g';
  w: number;
  h: number;
}

export interface ImageCategoryObject {
  pages: ImageObject[];
  cover: ImageObject;
  thumbnail: ImageObject;
}

export interface TagObject {
  id: number;
  name: string;
  count: number;
  /**
   * Relative URL to the tag from the site. \
   * Use {@link TagObject siteURL} to make your life easier.
   */
  url: string;
}
