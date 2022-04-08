import Kongou from '../src/index';

const kongou = new Kongou();

try {
  await kongou.getBook(1232121412);
} catch (e) {
  console.log(e);
}
