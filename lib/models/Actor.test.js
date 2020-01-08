const Actor = require('./Actor');

describe('Actor Model', () => {
  it('should have a Actor Name', () => {
    const studio = new Actor();
    const { errors } = studio.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
