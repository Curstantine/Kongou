export enum SortType {
  /// While this enum has `recent` as it's value, {@link QueryBuilder} internally
  /// removes sort type if it's set to recent
  /// as nhentai defaults to recent.
  Recent = 'recent',
  PopularAllTime = 'popular',
  PopularWeek = 'popular-week',
  PopularToday = 'popular-today',
}

export enum TagType {
  Artist = 'artist',
  Category = 'category',
  Character = 'character',
  Group = 'group',
  Language = 'language',
  Parody = 'parody',
  Tag = 'tag',
}

export enum LanguageType {
  English = 'english',
  Japanese = 'japanese',
  Chinese = 'Chinese',
}
