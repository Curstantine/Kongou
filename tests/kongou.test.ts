import Kongou from '../src'

new Kongou().getRandomResponse().then((x) => {
  console.log(x.tags.tags)
})
