const Kongou = require('../dist').default
const kongou = new Kongou()

kongou.getBook(363636).then((data) =>
  console.log('getBook: ', data.id)
).catch((x) => console.error(x))

kongou.getByQuery({ keywords: 'Ichigo Cake to Mont Blanc' }).then((data) =>
  console.log('getByQuery: ', data.result[0].id)
).catch((x) => console.error(x))

kongou.getHomePage({ language: 'english' }).then((data) =>
  console.log('getHomePage: ', data.latest.result[0].id, data.popular.result[0].id)
).catch((x) => console.error(x))

kongou.getRandomResponse().then((data) =>
  console.log('getRandomResponse: ', data.id)
).catch((x) => console.error(x))
