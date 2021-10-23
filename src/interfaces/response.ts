import Book from '../utils/book';
import { ImageTypes, TagObject, Title } from './common';

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
