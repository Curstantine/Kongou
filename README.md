# Kongou

A simple ESM typescript nhentai wrapper.

## Usage

Current Docs are for v4.3.0

```sh
yarn add kongou
```

```js
import Kongou from 'kongou';
import { QueryBuilder } from 'kongou/utils';
import { SortType } from "kongou/types";

const kongou = new Kongou();

kongou.getBook(1234);

const query = new QueryBuilder();
query.addTag()
```

## Exports.

- `kongou/utils`
    - Contains QueryBuilder for creating a query with easy.

- `kongou/enums`
    - Contains basic enums.

- `kongou/types`
    - Contains types of structures returned by the server.

## Contributors

Thank you! <3

- [Tracreed](https://git.fuyu.moe/Tracreed)
- [sinkaroid](https://www.github.com/sinkaroid)
