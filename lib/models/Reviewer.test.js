const Reviewer = require('./Reviewer');

describe('Studio Model', () => {
  it('should have a Reviewer Name', () => {
    const reviewer = new Reviewer();
    const { errors } = reviewer.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('should have a Reviewer company', () => {
    const reviewer = new Reviewer();
    const { errors } = reviewer.validateSync();
    expect(errors.company.message).toEqual('Path `company` is required.');
  });

});
