# Kongou

A simple typescript nhentai wrapper.

## Usage

Current Docs are for v4.1.x

```sh
npm i kongou
#Or using yarn
yarn add kongou
```

```js
import Kongou from 'kongou'

new Kongou().<method>
```

Use default if you are using es5 syntax.

```js
const { default: Kongou } = require('kongou');

new Kongou().<method>
```

You can access interfaces by importing the interface file!

```ts
import Kongou from 'Kongou';
import {} from 'Kongou/interfaces/';
```

Each class has it's own helper class, which makes your life easier.

## Methods

### `getBook(id: number): Promise<Book>`

```ts
new Kongou().getBook(363636);
```

### `getByQuery(query: string): Promise<BookQuery>`

```ts
new Kongou().getByQuery('Ichigo Cake to Mont Blanc');
```

### `getRandomBook(): Response`

```ts
new Kongou().getRandom();
```

## Contributors

- [Tracreed](https://git.fuyu.moe/Tracreed)
- [sinkaroid](https://www.github.com/sinkaroid)

**Thank you!** <3
