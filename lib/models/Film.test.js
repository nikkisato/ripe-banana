const Film = require('./Film');
const objectId = require('mongoose').Types.objectId;


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
  it('has actor ID in cast', () => {
    const film = new Film({
      title: 'Godzilla',
      studio: objectId,
      released: 1964,
      cast: [{ role: 'Godzilla', actor: 'corgi' }]
    });
  
    const { errors } = film.validateSync();
    expect(errors['cast.0.actor'].message).toEqual('Cast to ObjectID failed for value "corgi" at path "actor"');
  });
});

