// Initializes the `cart-items` service on path `/cart-items`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CartItems } from './cart-items.class';
import hooks from './cart-items.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'cart-items': CartItems & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cart-items', new CartItems(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cart-items');

  service.hooks(hooks);
}
