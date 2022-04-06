import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { LanguageType, SortType, TagType } from '../src/enums';
import { QueryBuilder } from '../src/utils/index';

const testQueryBuilder = suite('Tests for Kongou/utils/QueryBuilder.');
const queryBuilder = new QueryBuilder();

testQueryBuilder.before.each(() => {
  queryBuilder.flush();
});

testQueryBuilder('Empty', () => {
  assert.equal(queryBuilder.build(), '');
});

testQueryBuilder('Single tag.', () => {
  queryBuilder.addTag(TagType.Parody, 'tag1');

  assert.equal(queryBuilder.build(), 'query=parody:tag1');
});

testQueryBuilder('Adding tags.', () => {
  queryBuilder.addTag(TagType.Artist, 'artist1', 'artist2');
  queryBuilder.addTag(TagType.Tag, 'tag1', 'tag2');

  assert.equal(queryBuilder.build(), 'query=artist:artist1+artist:artist2+tag:tag1+tag:tag2');
});

testQueryBuilder('Single Language', () => {
  queryBuilder.addLanguage(LanguageType.English);

  assert.equal(queryBuilder.build(), 'query=language:english');
});

testQueryBuilder('Adding Languages.', () => {
  queryBuilder.addLanguage(LanguageType.English, LanguageType.Japanese);

  assert.equal(queryBuilder.build(), 'query=language:english+language:japanese');
});

testQueryBuilder('Setting sort type', () => {
  queryBuilder.setSort(SortType.PopularAllTime);

  assert.equal(queryBuilder.build(), 'sort=popular');
});

testQueryBuilder('Mixed tags and sorts', () => {
  queryBuilder.addTag(TagType.Tag, 'tag1');
  queryBuilder.addLanguage(LanguageType.English);
  queryBuilder.setSort(SortType.PopularAllTime);

  const q = [
    'query=tag:tag1+language:english&sort=popular',
    'query=language:english+tag:tag1&sort=popular',
  ];
  const qbr = queryBuilder.build();

  if (!q.includes(qbr)) {
    throw new Error(
      `Doesn't match!\n      Expected value: ${q.join(' or ')}\n      Value returned: ${qbr}`,
    );
  }
});

testQueryBuilder('Comparing ugly and builders.', () => {
  queryBuilder.setTitle('test');
  queryBuilder.addTag(TagType.Tag, 'tag1');
  queryBuilder.addLanguage(LanguageType.English);
  queryBuilder.setSort(SortType.PopularToday);

  const ugly = QueryBuilder.ugly(
    { title: 'test', tags: { tag: ['tag1'] }, languages: [LanguageType.English] },
    SortType.PopularToday,
  );

  assert.equal(queryBuilder.build(), ugly.build());
});
testQueryBuilder.run();
