import { suite } from 'uvu';
import { compareABook, handleResourceCache } from './common';

import Book from '../src/utils/book';
import Kongou from '../src/index';

const local = await handleResourceCache();

compareABook(
  suite('Local Test, Book parsing.'),
  new Book(Kongou.defaultUrls(), local.book),
  local.book,
);
