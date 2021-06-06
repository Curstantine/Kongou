# [**Kongou**](https://www.npmjs.com/package/kongou)

A strongly typed nhentai wrapper that directly uses nhentai's infamous api without any dependencies.

## Features

✅ Simple & Stable

✅ 100% API coverage

✅ No Dependencies

✅ **_\*Strongly typed..._**

✅ Cute shipgirl ❤

\*Yeah I know this means nothing but gotta rep my hours of ~~copying md-y~~ trying to figuring out how this works.

## Installation

```npm
npm install kongou
```

## Examples

### `get()`

get() accepts `"https://nhentai.net/g/172132/" || "nhentai.net/g/172132/" || "172132" || 172132`.

```js
kongou.get(178513).then((data) => {
  console.log(data);
});

kongou.get("178513").then((data) => {
  console.log(data);
});

kongou.get("nhentai.net/g/356450").then((data) => {
  console.log(data);
});

kongou.get("https://nhentai.net/g/356450").then((data) => {
  console.log(data);
});
```

### `query()`

**`query()` can accepts strings and use them as a keyword!**  
It also accepts a [QueryParamObject](###`QueryParamObject)!!

```js
kongou.query("Feticolle").then((data) => {
  console.log(data);
});

kongou
  .query({ keyword: "Feticolle", page: 1, sort: "popular-today" })
  .then((data) => {
    console.log(data);
  });
```

## Parameters

### `QueryParamObject`

If an object is given to the parameter and some fields are not used, it will default to:

- If sort is not given, popular-today will be used.
- If page is not given first page will be used.

QueryParamObject looks like this:

```js
{
    keyword: string,
    sort: {'popular-today' | 'popular-week' | 'popular'},
    page: number,
}
```

## Tests?

```js
npm run test // runs a mocha test
npm run generic // runs a generic test... lol
```

## Returned

```js
{
  id: 172132,
  media_id: 968424,
  title: {
    english: '(C90) [Jitaku vacation (Ulrich)] FetiColle VOL.04 (Kantai Collection -KanColle-) [English] [CGrascal]',
    native: '(C90) [自宅vacation (うるりひ)] ふぇちこれVOL.04 (艦隊これくしょん -艦これ-) [英訳]',
    pretty: 'FetiColle VOL.04'
  },
  siteURL: 'https://nhentai/g/172132',
  scanlator: null, // Not implemented by the nhentai API still.......
  upload_date: { unix: 1471999457, date: 1970-01-18T00:53:19.457Z },
  artist: [
    {
      id: 19952,
      name: 'Ulrich',
      url: 'https://nhentai.net/artist/ulrich/',
      count: 74
    },
    // So it goes...?
  ],
  category: [
    {
      id: 33172,
      name: 'Doujinshi',
      url: 'https://nhentai.net/category/doujinshi/',
      count: 228729
    }
    // So it goes...?
  ],
  characters: [
    {
      id: 20062,
      name: 'Hamakaze',
      url: 'https://nhentai.net/character/hamakaze/',
      count: 526
    },
    // So it goes...
  ],
  groups: [
    {
      id: 4976,
      name: 'Jitaku vacation',
      url: 'https://nhentai.net/group/jitaku-vacation/',
      count: 68
    },
    // So it goes...?
  ],
  languages: [
    {
      id: 12227,
      name: 'English',
      url: 'https://nhentai.net/language/english/',
      count: 69378
    },
    // So it goes...?
  ],
  parodies: [
    {
      id: 1841,
      name: 'Kantai collection',
      url: 'https://nhentai.net/parody/kantai-collection/',
      count: 13793
    },
    // So it goes...
  ],
  tags: [
    {
      id: 2937,
      name: 'Big bonkers',
      url: 'https://nhentai.net/tag/big-bonkers/',
      count: 103273,
      category: 'Tag'
    },
    // So it goes...
  ],
  images: {
    pages: [
      'https://i.nhentai.net/galleries/968424/1.jpg',
      // So it goes..
    thumbnails: [
      'https://t.nhentai.net/galleries/968424/1t.jpg',
      // So it goes...
    ]
  },
  num_pages: 43,
  num_favorites: 8821
}
```

## Contributors

[Tracreed](https://git.fuyu.moe/Tracreed)  
[sinkaroid](https://github.com/sinkaroid)

```;
The ShipGirl Project, feat Kongou; ⓒ Kancolle
```

[![Discord](https://img.shields.io/discord/851119818668769330?color=%235A71C3&label=Discord&logo=discord&logoColor=white)](https://discord.gg/tkXBj7hg9h)
