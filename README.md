# [**Kongou**](https://www.npmjs.com/package/kongou)

[![image](https://konachan.com/sample/21e8c50c42ddb123161383059bf58302/Konachan.com%20-%20307018%20sample.jpg)](https://konachan.com/post/show/307018)

```;
The ShipGirl Project, feat Kongou; ⓒ Kancolle
```

Strongly typed nhentai wrapper that directly uses nhentai's infamous api without any dependencies.

## Features

✅ Simple & Stable

✅ 100% API coverage

✅ No Dependencies

✅ Strongly typed...

✅ Cute shipgirl ❤

## Installation

```npm
npm install kongou
```

## Examples

```js
// get() accepts both Strings and Numbers.
Kongou.get(178513).then((data) => {
  console.log(data);
});

Kongou.get("178513").then((data) => {
  console.log(data);
});

// query accepts a string and use it as a keyword.
Kongou.query("Feticolle").then((data) => {
  console.log(data);
});

// Check searchParameters for more information!
Kongou.query({ keyword: "Feticolle", page: 1, sort: "popular-today" }).then(
  (data) => {
    console.log(data);
  }
);
```

## Query - `searchParameters`

As mentioned earlier query accepts both strings and objects.  
searchParameter object accepts:

```js
{
    keyword: string,
    sort: {'popular-today' | 'popular-week' | 'popular'},
    page: number,
}
```

## Contributors

[Tracreed](https://git.fuyu.moe/Tracreed)  
[sinkaroid](https://github.com/sinkaroid)

[![Discord](https://img.shields.io/discord/698062395263942686?color=%235A71C3&label=Discord&logo=discord&logoColor=white)](https://discord.gg/ymuR2htTfy)
