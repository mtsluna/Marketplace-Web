import {ProductDetail} from './productDetail';
import {Store} from './store';
import {Image} from './image';
import {ProductArea} from './productArea';

export class Product {

  id: number;
  name: string;
  description: string;
  price: number;
  details: ProductDetail[] = [];
  store: Store;
  image: Image;
  area: ProductArea;
  count: number = 0;
}
