import { Kongou } from '../src';
import fetch from "node-fetch";

const kongou = new Kongou(fetch);

try {
  await kongou.getBook(1232121412);
} catch (e) {
  console.log(e);
}
