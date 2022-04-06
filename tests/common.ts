import { Test } from 'uvu';
import * as assert from 'uvu/assert';

import fetch from 'node-fetch';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import Book from '../src/structures/book';
import Images from '../src/structures/images';

import { ServerBook, ServerBookQuery } from '../src/types';
import { TagType } from '../src/enums';

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
    for (const name of Object.values(TagType)) {
      const tags = book.tags.getTagsWithType(name);

      if (tags === undefined) throw new Error('Tag Array is empty.');

      tags.forEach((tag) => {
        assert.equal(tag.type, name);
      });
    }
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
  query: ServerBookQuery;
};

export const handleResourceCache = async (id: number, queryString: string) => {
  if (existsSync('./cache.json')) {
    const cacheBuffer = await readFile('./cache.json');
    return JSON.parse(cacheBuffer.toString()) as CacheFile;
  }

  const book = (await getFromServer(id, 'book')) as ServerBook;
  const query = (await getFromServer(queryString, 'books')) as ServerBookQuery;

  const cacheFile: CacheFile = { book, query };
  await writeFile('./cache.json', JSON.stringify(cacheFile));

  return cacheFile;
};

export const getFromServer = async (
  qry: string | number,
  type: 'book' | 'books',
): Promise<ServerBook | ServerBookQuery> => {
  const u = 'https://nhentai.net/api/';
  const prep = type === 'books' ? 'galleries/search?' + qry : 'gallery/' + qry;

  const response = await fetch(u + prep);
  return (await response.json()) as ServerBook | ServerBookQuery;
};
