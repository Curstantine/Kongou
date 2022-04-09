# Kongou

A simple CommonJS and ES Module typescript client library for nhentai.

## Usage

Current Docs are for v5.0.0

```shell
yarn add @curstantine/kongou
```

```js
import {Longou, TagType, SortType, LanguageType} from "@curstantine/kongou";

// Fetching library that implements the fetch api.
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
const kongou = new Kongou(fetch);
await kongou.getBook(1234);

const query = new QueryBuilder()
        .addTag(TagType.Artist)
        .addLanguage(LanguageType.English)
        .setSort(SortType.Recent);
await kongou.getByQuery(query);
```

## Exports.

**x** is the module type.

- `kongou/x/utils`
    - Contains QueryBuilder for creating a query with easy.

- `kongou/x/enums`
    - Contains basic enums.

- `kongou/types`
    - Contains types of structures returned by the server.

## Contributors

Thank you! <3

- [Tracreed](https://git.fuyu.moe/Tracreed)
- [sinkaroid](https://www.github.com/sinkaroid)
