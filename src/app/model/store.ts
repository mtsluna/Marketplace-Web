import {Address} from './address';
import {Product} from './product';
import {Image} from './image';
import {StoreArea} from './storeArea';
import {User} from './user';

export class Store {

  id: number;
  name: string;
  CUIL: string;
  businessName: string;
  address: Address;
  products: Product[] = [];
  image: Image;
  area: StoreArea;
  user: User;

}
