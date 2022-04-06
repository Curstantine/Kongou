import { Test } from 'uvu';
import * as assert from 'uvu/assert';

import fetch from 'node-fetch';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import Book from '../src/structures/book';
import Images from '../src/structures/images';
import { QueryBuilder } from '../src/utils';

import { ServerBook, ServerBookQuery } from '../src/types';
import { LanguageType, TagType } from '../src/enums';

export const fragQueryBuilder = (testQueryBuilder: Test, queryBuilder: QueryBuilder) => {
  testQueryBuilder.before.each(() => {
    queryBuilder.flush();
  });

  testQueryBuilder('Empty', () => {
    assert.equal(queryBuilder.build(), '');
  });

  testQueryBuilder('Single tag.', () => {
    queryBuilder.addTag(TagType.Parody, 'tag1');

    assert.equal(queryBuilder.build(), 'parody:tag1');
  });

  testQueryBuilder('Adding tags.', () => {
    queryBuilder.addTag(TagType.Artist, 'artist1', 'artist2');
    queryBuilder.addTag(TagType.Tag, 'tag1', 'tag2');

    assert.equal(queryBuilder.build(), 'artist:artist1+artist:artist2+tag:tag1+tag:tag2');
  });

  testQueryBuilder('Single Language', () => {
    queryBuilder.addLanguage(LanguageType.English);

    assert.equal(queryBuilder.build(), 'language:english');
  });

  testQueryBuilder('Adding Languages.', () => {
    queryBuilder.addLanguage(LanguageType.English, LanguageType.Japanese);

    assert.equal(queryBuilder.build(), 'language:english+language:japanese');
  });

  testQueryBuilder('Mixed tags', () => {
    queryBuilder.addTag(TagType.Tag, 'tag1');
    queryBuilder.addLanguage(LanguageType.English);

    const q = ['tag:tag1+language:english', 'language:english+tag:tag1'];
    const qbr = queryBuilder.build();

    if (!q.includes(qbr)) {
      throw new Error(
        `Doesn't match!\n      Expected value: ${q.join(' or ')}\n      Value returned: ${qbr}`,
      );
    }
  });

  testQueryBuilder.run();
};

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
      book.tags.getTagsWithType(name).forEach((tag) => {
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
};

export const handleResourceCache = async (id: number) => {
  if (existsSync('./cache.json')) {
    const cacheBuffer = await readFile('./cache.json');
    return JSON.parse(cacheBuffer.toString()) as CacheFile;
  }

  const book = (await etch(id, 'book')) as ServerBook;

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
