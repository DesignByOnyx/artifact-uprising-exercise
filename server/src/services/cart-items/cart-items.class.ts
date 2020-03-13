import { Service, MemoryServiceOptions } from 'feathers-memory';
import { Application } from '../../declarations';

export class CartItems extends Service {
  constructor(options: Partial<MemoryServiceOptions>, app: Application) {
    super(options);
  }
}
