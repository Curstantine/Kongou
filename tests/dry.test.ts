import { QueryBuilder, TagType, LanguageType } from '../src/utils/index';

const qb = new QueryBuilder();

qb.addTag(TagType.Artist, 'pepga', 'lolega');
qb.addLanguage(LanguageType.English);
console.log(qb.build());
