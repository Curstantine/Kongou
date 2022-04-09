import { suite } from 'uvu';
import fetch from "node-fetch";
import { compareABook, getFromServer, handleResourceCache } from './common';

import Book from '../src/structures/book';
import { Kongou, QueryBuilder } from '../src/index';
import { ServerBook } from '../src/types';

const id = 4412;
const query = QueryBuilder.ugly({ title: 'test' }).build();

const local = await handleResourceCache(id, query);
const kongou = new Kongou(fetch);

compareABook(
  suite('Local Test, Book parsing.', { book: new Book(Kongou.defaultUrls(), local.book) }),
  local.book,
);

const getBookAble = await kongou.getBook(4412);
compareABook(suite(`<Kongou>.getBook(), ID: ${getBookAble.id}`, { book: getBookAble }), local.book);

const getRandomAble = await kongou.getRandom();
const dr = (await getFromServer(getRandomAble.id, 'book')) as ServerBook;
compareABook(suite(`<Kongou>.getRandom(), ID: ${getRandomAble.id}`, { book: getRandomAble }), dr);

const queryAble = await kongou.getByQuery(query);
local.query.result.forEach((data) => {
  const querySuite = suite(
    `<Kongou>.getByQuery(), Query: ${query.replace('query=', '')}, ID: ${data.id}`,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { book: queryAble.result.get(data.id)! },
  );
  compareABook(querySuite, data);
});
