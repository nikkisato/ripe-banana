const Review = require('./Review');
const objectId = require('mongoose').Types.objectId;


describe('Review Model', () => {
  it('should have a Review rating', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });

  it('has text min length 1 characters', () => {
    const review = new Review({
      rating: 0
    });

    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (0) is less than minimum allowed value (1).');
  });

  it('has text max  5 characters', () => {
    const review = new Review({
      rating: 9
    });

    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (9) is more than maximum allowed value (5).');
  });

  it('should have a reviewer', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
  });

  it('should have a review', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.review.message).toEqual('Path `review` is required.');
  });

  it('should have a film', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.film.message).toEqual('Path `film` is required.');
  });


  it('has film ID ', () => {
    const review = new Review({
      rating: 4,
      reviewer: objectId,
      review: 'This was interesting',
    });
  
    const { errors } = review.validateSync();
    expect(errors['film'].message).toEqual('Path `film` is required.');
  });
});

