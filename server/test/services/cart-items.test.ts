import app from '../../src/app';

describe('\'cart-items\' service', () => {
  it('registered the service', () => {
    const service = app.service('cart-items');
    expect(service).toBeTruthy();
  });
});
