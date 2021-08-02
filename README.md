# Kongou

A simple typescript nhentai wrapper.

## Usage

Current Docs are for v4.0.3

```sh
npm i kongou@latest
```

```js
import Kongou from 'kongou'

new Kongou().<method>
```

Use default if you are using es5 syntax.

```js
const Kongou = require('kongou').default

new Kongou().<method>
```

You can access interfaces by importing the interface file!

Responses from Kongou = `dist/interfaces/parser.ts`  
Responses from Server = `dist/interfaces/server.ts`

```ts
import Kongou from 'Kongou'
import {} from 'Kongou/dist/Interfaces/'
```

## Constructor

Kongou has support for proxy sites that use the same api.

**Support is half baked!**  
Please do tell me if you find an API that has the same URL format.

- `defaultSite`: Main Site URL.
  - eg: <https://nhentai.net>
  
  - Defaults to <https://nhentai.net> if none is given.

- `staticSite`: Static Site URLs.
  - eg: <https://i.nhentai.net> or <https://t.nhentai.net>

  - Defaults to <https://i.nhentai.net> and <https://t.nhentai.net> if none is given.

```js
new Kongou(defaultSite: string, staticSite: { thumbnails: string, images: string })
```

## Functions

### `<Kongou>().getBook(id: string | number): Promise<Response>`

- `id` = nhentai Gallery Id.
  - `eg: 363636`

```ts
new Kongou().getBook(363636)
```

Returns data identical to Response interface.

---

### `<Kongou>().getByQuery(object: queryParam | string): Promise<QueryResponse>`

Param can be either a string (which will be used as queryParam.keywords) or a queryParam type.

```ts
import { queryParam } from "Kongou/dist/Interfaces/parser"

const param: queryParam = { keywords: 'Ichigo Cake to Mont Blanc', lang: 'english', page: 1, sort: 'popular' }

new Kongou().getByQuery(params)
new Kongou().getByQuery('Ichigo Cake to Mont Blanc')
```

Returns data identical to QueryResponse interface.

---

### `<Kongou>().getHomePage(filters: { language: string }): Promise<HomePageResponse>`

As the name implies returns the "latest" and "popular now" like results.  
For now filter only supports language.

```ts
new Kongou().getHomePage({ langauge: 'english' })
```

Returns data identical to HomePageResponse interface.

---

### `<Kongou>().getRandomBook(): Response`

Returns a random title using the `/random` endpoint!  

```ts
new Kongou().getRandomBook()
```

Returns data identical to Response interface.

---

## Contribute?

Before making a pull or such, please do lint the files with the config given and comment on what something does.

I'm sure there are lots of grammartical errors with both docs and other comments, if you do come across one please do let me know!

## Contributors

You guys made me a javascript addict, made me obssesed with Kongou.  
Anyways, you guys made me eager to open up VSC and stonk my JS skill everyday!

- [Tracreed](https://git.fuyu.moe/Tracreed)
- [sinkaroid](https://www.github.com/sinkaroid)

**Thank you!** <3
