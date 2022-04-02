import { Test } from 'uvu';
import * as assert from 'uvu/assert';

import fetch from 'node-fetch';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import Book from '../src/utils/book';
import Images from '../src/utils/images';
import { ServerBook, ServerBookQuery } from '../src/interfaces/response';

export const compareABook = (testLocalParsing: Test, book: Book, expectedBook: ServerBook) => {
  testLocalParsing('Book metadata.', () => {
    assert.equal(book.id, expectedBook.id);
    assert.equal(book.title, expectedBook.title);
    assert.equal(book.media_id, expectedBook.media_id);
    assert.equal(book.getSiteURL(), `https://nhentai.net/g/${expectedBook.id}`);
    assert.equal(book.num_favorites, expectedBook.num_favorites);
    assert.equal(book.num_pages, expectedBook.num_pages);
  });

  testLocalParsing('Metadata of tags.', () => {
    assert.equal(book.tags.length, expectedBook.tags.length);
    book.tags.forEach((tag, i) => {
      assert.equal(tag.id, expectedBook.tags[i].id);
      assert.equal(tag.name, expectedBook.tags[i].name);
      assert.equal(tag.type, expectedBook.tags[i].type);
      assert.equal(tag.url, expectedBook.tags[i].url);
      assert.equal(tag.count, expectedBook.tags[i].count);
      assert.equal(tag.getSiteURL(), `https://nhentai.net${expectedBook.tags[i].url}`);
    });
  });

  testLocalParsing('Image data', () => {
    assert.equal(book.images.cover, expectedBook.images.cover);
    assert.equal(book.images.thumbnail, expectedBook.images.thumbnail);
    assert.equal(book.images.pages, expectedBook.images.pages);

    assert.equal(
      book.images.getCover(),
      `https://i.nhentai.net/galleries/${expectedBook.media_id}/cover.${
        Images.extension[expectedBook.images.cover.t]
      }`,
    );

    book.images.getThumbnails().forEach((thumbnail, i) => {
      assert.equal(
        thumbnail,
        `https://t.nhentai.net/galleries/${expectedBook.media_id}/${i + 1}t.${
          Images.extension[expectedBook.images.thumbnail.t]
        }`,
      );
    });

    book.images.getPages().forEach((page, i) => {
      assert.equal(
        page,
        `https://i.nhentai.net/galleries/${expectedBook.media_id}/${i + 1}.${
          Images.extension[expectedBook.images.pages[i].t]
        }`,
      );
    });
  });

  testLocalParsing.run();
};

type CacheFile = {
  book: ServerBook;
};

export const handleResourceCache = async (id: number) => {
  if (existsSync('./cache.json')) {
    const cacheBuffer = await readFile('./cache.json');
    return JSON.parse(cacheBuffer.toString()) as CacheFile;
  }

  const book = await etch(id, "book") as ServerBook;

  const cacheFile: CacheFile = { book };
  await writeFile('./cache.json', JSON.stringify(cacheFile));

  return cacheFile;
};

export const etch = async (
  qry: string | number,
  type: 'book' | 'books',
): Promise<ServerBook | ServerBookQuery> => {
  const u = 'https://nhentai.net/api/';
  const prep = type === 'books' ? 'galleries/search?query=' + qry : 'gallery/' + qry;

  const response = await fetch(u + prep);
  return (await response.json()) as ServerBook | ServerBookQuery;
};
