// const Review = require('./Review');

// describe('Review Model', () => {
//   it('should have a Review rating', () => {
//     const review = new Review();
//     const { errors } = review.validateSync();
//     expect(errors.rating.message).toEqual('Path `rating` is required.');
//   });


//   it('has text length 1 characters', () => {
//     const review = new Review({
//       rating: 1
//     });

//     const { errors } = review.validateSync();
//     expect(errors.rating).toEqual(`Path \`rating\` (\`${Review.rating}\`) is minimum (1).`);
//   });


//   it('has text max length 5 characters', () => {
//     const review = new Review({
//       rating: 5
//     });

//     const { errors } = review.validateSync();
//     expect(errors.rating).toEqual(`Path \`rating\` (\`${Review.rating}\`) is maximum (5).`);
//   });

//   it('should have a reviewer', () => {
//     const review = new Review();
//     const { errors } = review.validateSync();
//     expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
//   });

//   it('should have a review', () => {
//     const review = new Review();
//     const { errors } = review.validateSync();
//     expect(errors.review.message).toEqual('Path `review` is required.');
//   });

//   it('has review character length max 140 characters', () => {
//     const review = new Review({
//       review: 'I'.repeat(140)
//     });

//     const { errors } = review.validateSync();
//     expect(errors.review.message).toEqual(`Path \`review\` (\`${Review.review}\`) is longer than the maximum allowed length (140).`);
//   });

//   it('should have a film', () => {
//     const review = new Review();
//     const { errors } = review.validateSync();
//     expect(errors.film.message).toEqual('Path `film` is required.');
//   });
// });

