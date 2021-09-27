const { Kongou } = require('../build/index');

(async () => {
  console.time('Starts Kongou');

  const kon = new Kongou('');
  const data = await kon.getByQuery('english kasdujabndsasdadadaidh');
  console.log(data);
  console.timeEnd('Starts Kongou');
})();
