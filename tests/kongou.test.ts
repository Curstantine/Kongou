import { suite } from 'uvu';
import { compareABook, etch, handleResourceCache } from './common';

import Book from '../src/utils/book';
import Kongou from '../src/index';
import { ServerBook, ServerBookQuery } from '../src/interfaces/response';

const local = await handleResourceCache(4412);
const kongou = new Kongou();

compareABook(
  suite('Local Test, Book parsing.'),
  new Book(Kongou.defaultUrls(), local.book),
  local.book,
);

const getBookAble = await kongou.getBook(4412);
compareABook(suite(`<Kongou>.getBook(), ID: ${getBookAble.id}`), getBookAble, local.book);

const query = 'title:test';
const queryAble = await kongou.getByQuery(query);
const dq = ((await etch(query, 'books')) as ServerBookQuery).result;
for (const di in dq) {
  const current = dq[di];
  const querySuite = suite(`<Kongou>.getByQuery(), Query: ${query}, ID: ${current.id}`);
  compareABook(querySuite, queryAble.result.get(current.id)!, current);
}

const getRandomAble = await kongou.getRandom();
const dr = (await etch(getRandomAble.id, 'book')) as ServerBook;
compareABook(suite(`<Kongou>.getRandom(), ID: ${getRandomAble.id}`), getRandomAble, dr);
