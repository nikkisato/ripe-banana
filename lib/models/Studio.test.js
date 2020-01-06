const Studio = require('./Studio');

describe('Studio Model', () => {
  it('should have a Studio Title', () => {
    const studio = new Studio();
    const { errors } = studio.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
