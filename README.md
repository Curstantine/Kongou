# Kongou

A simple typescript nhentai wrapper.

## Usage

Current Docs are for v4.0.1

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

Returns data identical to [Response](#Response) interface.

---

### `<Kongou>().getByQuery(object: queryParam): Promise<QueryResponse>`

Param must be a [queryParam](#QueryParam) Type!

```ts
import { queryParam } from "Kongou/dist/Interfaces/parser"

const param: queryParam = { keywords: 'Ichigo Cake to Mont Blanc', lang: 'english', page: 1, sort: 'popular' }

new Kongou().getByQuery(params)
```

Returns data identical to [QueryResponse](#QueryResponse)

---

### `<Kongou>().getHomePage(object: filters): Promise<HomePageResponse>`

As the name implies returns the "latest" and "popular now" like results.  
For now filter only supports language.

```ts
new Kongou().getHomePage({ langauge: 'english' })
```

Returns data identical to [HomePageResponse](#HomePageResponse)

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

## Interfaces

**Already typed into the library. Go check that out!**

### Response

```ts
{
    /**
     * id of this object.
     * `eg: 363636`
     */
    id: number
    /**
     * media_id of this object.
     * `eg: 1940023`
     */
    media_id: number
    /**
     * Site URL of this object.
     * https://nhentai.net/g/363636
     */
    url: string
    /**
     * Titles of this object.
     */
    title: {
        /**
         * English title of this object.
         * `[Azuma Tesshin] Ichigo Cake to Mont Blanc | Strawberry Cake & Mont Blanc - The cherry boy with Bitch sister. (COMIC Kairakuten 2018-05) [English] [Tamamo | GDS] [Digital]"`
         */
        english: string
        /**
         * Native title of this object.
         * `[東鉄神] イチゴのケーキとモンブラン (COMIC 快楽天 2018年5月号) [英訳] [DL版]`
         */
        native: string
        /**
         * Pretty title of this object.
         * `Ichigo Cake to Mont Blanc | Strawberry Cake & Mont Blanc - The cherry boy with Bitch sister.`
         */
        pretty: string
    }
    /**
     * Images of this object.
     */
    images: {
        /**
         * Full size image urls.
         */
        pages: string[]
        /**
         * Cover sized image url.
         */
        cover: string
        /**
         * Thumbnail sized image url.
         */
        thumbnail: string
    }
    /**
     * Scanlator of this object.
     * Not available still. :-(
     */
    scanlator: string | undefined
    /**
     * Uploaded date of this object.
     */
    upload_date: Date
    /**
     * Tags of this object.
     */
    tags: {
        artists: [{
            /**
             * nhentai id for this tag.
             */
            id: number
            /**
             * Name of this tag.
             * `big boobs`
             */
            name: string
            /**
             * Site URL of this tag.
             * `https://nhentai.net/tag/big-boobs`
             */
            url: string
            /**
             * Amount of titles in this tag.
             */
            count: number
        }]
        category: [{
            /**
             * nhentai id for this tag.
             */
            id: number
            /**
             * Name of this tag.
             * `big boobs`
             */
            name: string
            /**
             * Site URL of this tag.
             * `https://nhentai.net/tag/big-boobs`
             */
            url: string
            /**
             * Amount of titles in this tag.
             */
            count: number
        }]
        characters: [{
            /**
             * nhentai id for this tag.
             */
            id: number
            /**
             * Name of this tag.
             * `big boobs`
             */
            name: string
            /**
             * Site URL of this tag.
             * `https://nhentai.net/tag/big-boobs`
             */
            url: string
            /**
             * Amount of titles in this tag.
             */
            count: number
        }]
        groups: [{
            /**
             * nhentai id for this tag.
             */
            id: number
            /**
             * Name of this tag.
             * `big boobs`
             */
            name: string
            /**
             * Site URL of this tag.
             * `https://nhentai.net/tag/big-boobs`
             */
            url: string
            /**
             * Amount of titles in this tag.
             */
            count: number
        }]
        languages: [{
            /**
             * nhentai id for this tag.
             */
            id: number
            /**
             * Name of this tag.
             * `big boobs`
             */
            name: string
            /**
             * Site URL of this tag.
             * `https://nhentai.net/tag/big-boobs`
             */
            url: string
            /**
             * Amount of titles in this tag.
             */
            count: number
        }]
        parodies: [{
            /**
             * nhentai id for this tag.
             */
            id: number
            /**
             * Name of this tag.
             * `big boobs`
             */
            name: string
            /**
             * Site URL of this tag.
             * `https://nhentai.net/tag/big-boobs`
             */
            url: string
            /**
             * Amount of titles in this tag.
             */
            count: number
        }]
        tags: [{
            /**
             * nhentai id for this tag.
             */
            id: number
            /**
             * Name of this tag.
             * `big boobs`
             */
            name: string
            /**
             * Site URL of this tag.
             * `https://nhentai.net/tag/big-boobs`
             */
            url: string
            /**
             * Amount of titles in this tag.
             */
            count: number
        }]
    }
    /**
     * Number of pages this object has.
     */
    num_pages: number
    /**
     * Number of favorites of this object in nhentai
     */
    num_favorites: number
}
```

### QueryResponse

```ts
{
    /**
     * Array of {@link Response}
     * ``results = per_page * num_pages``
     */
    result: Response[]
    /**
     * Number of pages for this query.
     */
    num_pages: number
    /**
     * Number of {@link Response} per page.
     */
    per_page: number
}
```

### HomePageResponse

```ts
{
    /**
     * Results identical to "Latest" on the HomePage of the website in {@link QueryResponse} format.
     */
    latest: QueryResponse
    /**
     * Results identical to "Popular" on the HomePage of the website in {@link QueryResponse} format.
     */
    popular: QueryResponse
}
```

### QueryParam

```ts
{
    keywords: string
    page?: number,
    sort?: 'popular' | 'popular-today' | 'popular-weekly'
    lang?: 'english' | 'japanese' | 'chinese'
}
```
