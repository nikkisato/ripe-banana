const Film = require('./Film');

describe('Film Model', () => {
  it('should have a Film title', () => {
    const film = new Film();
    const { errors } = film.validateSync();
    expect(errors.title.message).toEqual('Path `title` is required.');
  });


  it('should have a Film studio', () => {
    const film = new Film();
    const { errors } = film.validateSync();
    expect(errors.studio.message).toEqual('Path `studio` is required.');
  });


  it('should have a Film release', () => {
    const film = new Film();
    const { errors } = film.validateSync();
    expect(errors.released.message).toEqual('Path `released` is required.');
  });


//   it('should have a Film actor within cast', () => {
//     const film = new Film();
//     const { errors } = film.validateSync();
//     expect(errors.cast.actor).toEqual('Path `actor` is required.');
//     //trying to get to actor which is required?
//   });
});
