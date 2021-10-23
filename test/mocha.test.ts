import Kongou from '../src/index';
import Book from '../src/utils/book';
import chai from 'chai';

import { KongouBookQuery } from '../src/interfaces/response';

const expect = chai.expect;

describe('Kongou', () => {
  describe('getBook()', () => {
    let book: Book;
    let id = 363636;

    before(async () => {
      book = await new Kongou().getBook(id);
    });

    it('Should be instance of a Book class', () => {
      expect(book).to.be.instanceof(Book);
    });

    it('ID should be a number', () => {
      expect(book.id).to.be.a('number');
    });

    it('Media ID should be a string', () => {
      expect(book.media_id).to.be.a('string');
    });

    it('Titles should be string', () => {
      it('English title should be a string', () => {
        expect(book.title.english).to.be.a('string');
      });

      it('Native title should be a string', () => {
        expect(book.title.japanese).to.be.a('string');
      });

      it('Pretty title should be a string', () => {
        expect(book.title.pretty).to.be.a('string');
      });
    });

    it('Images should be their types.', () => {
      it('Cover URL: "h, w, t" to be their types.', () => {
        expect(book.images.cover.h).to.be.a('number');
        expect(book.images.cover.w).to.be.a('number');
        expect(book.images.cover.t).to.be.a('string');
      });

      it('Thumbnail URL: "h, w, t" to be their types.', () => {
        expect(book.images.thumbnail.h).to.be.a('number');
        expect(book.images.thumbnail.w).to.be.a('number');
        expect(book.images.thumbnail.t).to.be.a('string');
      });

      it('Image URLs: "h, w, t" to be their types.', () => {
        book.images.pages.forEach((image) => {
          expect(image.h).to.be.a('number');
          expect(image.w).to.be.a('number');
          expect(image.t).to.be.a('string');
        });
      });
    });

    it('Scanlator to be either undefined or a string', () => {
      if (typeof book.scanlator !== 'string') {
        expect(book.scanlator).to.be('undefined');
      } else {
        expect(book.scanlator).to.be.a('string');
      }
    });

    it('Upload date should be a number (unix)', () => {
      expect(book.upload_date).to.be.a('number');
      // Unix time of the first nhentai upload.
      expect(book.upload_date).to.be.greaterThanOrEqual(1403964736);
    });

    it("Tags should be it's type", () => {
      book.tags.forEach((tags) => {
        expect(tags.id).to.be.a('number');
        expect(tags.name).to.be.a('string');
        expect(tags.url).to.be.a('string');
        expect(tags.count).to.be.a('number');
      });
    });

    it('Num Pages should be a number', () => {
      expect(book.num_pages).to.be.a('number');
    });

    it('Num Favourites should be a number', () => {
      expect(book.num_favorites).to.be.a('number');
    });
  });

  describe('getByQuery()', () => {
    let query: KongouBookQuery;

    before(async () => {
      query = await new Kongou().getByQuery('mount blanc');
    });

    it('Num ages should be a number', () => {
      expect(query.num_pages).to.be.a('number');
    });

    it('Per page should be a number', () => {
      expect(query.per_page).to.be.a('number');
    });

    it('Results should be their type', () => {
      query.result.forEach((book, id) => {
        it('Should be instance of a Book class', () => {
          expect(book).to.be.instanceof(Book);
        });

        it('ID should be a number', () => {
          expect(book.id).to.be.a('number');
        });

        it('Media ID should be a string', () => {
          expect(book.media_id).to.be.a('string');
        });

        it('Titles should be string', () => {
          it('English title should be a string', () => {
            expect(book.title.english).to.be.a('string');
          });

          it('Native title should be a string', () => {
            expect(book.title.japanese).to.be.a('string');
          });

          it('Pretty title should be a string', () => {
            expect(book.title.pretty).to.be.a('string');
          });
        });

        it('Images should be their types.', () => {
          it('Cover URL: "h, w, t" to be their types.', () => {
            expect(book.images.cover.h).to.be.a('number');
            expect(book.images.cover.w).to.be.a('number');
            expect(book.images.cover.t).to.be.a('string');
          });

          it('Thumbnail URL: "h, w, t" to be their types.', () => {
            expect(book.images.thumbnail.h).to.be.a('number');
            expect(book.images.thumbnail.w).to.be.a('number');
            expect(book.images.thumbnail.t).to.be.a('string');
          });

          it('Image URLs: "h, w, t" to be their types.', () => {
            book.images.pages.forEach((image) => {
              expect(image.h).to.be.a('number');
              expect(image.w).to.be.a('number');
              expect(image.t).to.be.a('string');
            });
          });
        });

        it('Scanlator to be either undefined or a string', () => {
          if (typeof book.scanlator !== 'string') {
            expect(book.scanlator).to.be('undefined');
          } else {
            expect(book.scanlator).to.be.a('string');
          }
        });

        it('Upload date should be a number (unix)', () => {
          expect(book.upload_date).to.be.a('number');
          // Unix time of the first nhentai upload.
          expect(book.upload_date).to.be.greaterThanOrEqual(1403964736);
        });

        it("Tags should be it's type", () => {
          book.tags.forEach((tags) => {
            expect(tags.id).to.be.a('number');
            expect(tags.name).to.be.a('string');
            expect(tags.url).to.be.a('string');
            expect(tags.count).to.be.a('number');
          });
        });

        it('Num Pages should be a number', () => {
          expect(book.num_pages).to.be.a('number');
        });

        it('Num Favourites should be a number', () => {
          expect(book.num_favorites).to.be.a('number');
        });
      });
    });
  });
});
