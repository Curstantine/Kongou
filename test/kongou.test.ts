// import Kongou from '../src';
//
// let kongou = new Kongou();
//
// test('Test getBook() and it\'s data', (done) => {
//   handleAsyncTest(
//     done,
//     kongou.getBook(363636),
//     (d) => {
//       expect(d.id).toBe(363636);
//     },
//   );
// });
//
// function handleAsyncTest<T>(done: jest.DoneCallback, promise: Promise<T>, test: (d: T) => void) {
//   promise
//     .then((d) => {
//       test(d);
//       done();
//     })
//     .catch((error) => done(error));
// }