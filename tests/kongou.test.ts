import { suite } from 'uvu';
import { compareABook, getFromServer, handleResourceCache } from './common';

import Book from '../src/structures/book';
import Kongou from '../src/index';
import { QueryBuilder } from '../src/utils/index';
import { ServerBook } from '../src/types';

const id = 4412;
const query = QueryBuilder.ugly({ title: 'test' }).build();

const local = await handleResourceCache(id, query);
const kongou = new Kongou();

compareABook(
  suite('Local Test, Book parsing.'),
  new Book(Kongou.defaultUrls(), local.book),
  local.book,
);

const getBookAble = await kongou.getBook(4412);
compareABook(suite(`<Kongou>.getBook(), ID: ${getBookAble.id}`), getBookAble, local.book);

const getRandomAble = await kongou.getRandom();
const dr = (await getFromServer(getRandomAble.id, 'book')) as ServerBook;
compareABook(suite(`<Kongou>.getRandom(), ID: ${getRandomAble.id}`), getRandomAble, dr);

const queryAble = await kongou.getByQuery(query);
for (const data of local.query.result) {
  const querySuite = suite(
    `<Kongou>.getByQuery(), Query: ${query.replace('query=', '')}, ID: ${data.id}`,
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  compareABook(querySuite, queryAble.result.get(data.id)!, data);
}
