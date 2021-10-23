import Kongou from '../src/index';

(async () => {
  const data = await new Kongou().getBook(363636);

  console.log(data);
})();
