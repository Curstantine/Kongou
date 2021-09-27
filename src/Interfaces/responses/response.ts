import { Book } from '../../book';
import { ImageCategoryObject, TagObject, TitleObject } from './common';

export interface ServerBook {
  id: number;
  media_id: string;
  title: TitleObject;
  images: ImageCategoryObject;
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

export interface KongouBookQuery {
  result: Map<Book['id'], Book>;
  num_pages: number;
  per_page: number;
}
