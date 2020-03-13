import app from '../../src/app';

describe('\'cart-item\' service', () => {
  it('registered the service', () => {
    const service = app.service('cart-item');
    expect(service).toBeTruthy();
  });
});
